package org.twitterSystem

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.algorithms.Algorithm
import io.javalin.http.*
import io.javalin.security.RouteRole
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.*

class TokenService (private val twitterSystem: TwitterSystem) {
    val algorithm: Algorithm = Algorithm.HMAC256("very_secret")
    val generator: JWTGenerator<UserDTO> = JWTGenerator<UserDTO> {
        user: UserDTO, alg: Algorithm? ->
            val token: JWTCreator.Builder = JWT.create()
                .withClaim("id", user.id)
                token.sign(alg) }

    val verifier = JWT.require(algorithm).build()

    var provider = JWTProvider<UserDTO>(algorithm, generator, verifier)

    fun createToken(user: UserDTO) = provider.generateToken(user)

    fun validateToken(token: String): User {
        val decodedJWT = provider.validateToken(token).orElseThrow { throw Exception("Invalid token") }
        val userId = decodedJWT.getClaim("id").asString()
        try {
            val user = twitterSystem.getUser(userId)
            return user
        } catch (e: UserException) {
            throw NotFoundResponse("No existe el usuario con el id dado")
        }
    }

    fun validate(handler: Handler, ctx: Context, routerRoles: Set<RouteRole>) {
        val header = ctx.header("Authorization")
        when {
            routerRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
            header == null -> {
                throw UnauthorizedResponse("Invalid token")
            }

            else -> {
                val token = provider.validateToken(header)
                if (token.isPresent) {
                    val userId = token.get().getClaim("id").asString()
                    val user: User
                    try {
                        user = twitterSystem.getUser(userId)
                    } catch (e: UserException) {
                        throw ForbiddenResponse("Invalid token")
                    }
                    if (routerRoles.contains(Roles.USER)) {
                        ctx.attribute("user", user)
                        handler.handle(ctx)
                    } else {
                        throw ForbiddenResponse("Unauthourized resource.")
                    }
                } else {
                    throw UnauthorizedResponse("Invalid token")
                }
            }
        }
    }
}
