package org.twitterSystem
import io.javalin.http.*
import org.unq.*

class UserController(val twitterSystem: TwitterSystem, private val tokenService : TokenService) {

    fun login(ctx: Context) {
        val userLoginDTO = ctx.bodyValidator<UserLoginDTO>()
            .check({ user -> user.username.isNotBlank() }, "el nombre de usuario no puede ser vacio")
            .check({ user -> user.password.isNotBlank() }, "la contraseña no debe ser vacia")
            .getOrThrow { throw BadRequestResponse("los campos ingresados son inválidos") }

        val user =
            twitterSystem.users.find { it.username == userLoginDTO.username && it.password == userLoginDTO.password }
                ?: throw NotFoundResponse("Nombre o contraseña incorrecta")
        ctx.header("Authorization", tokenService.createToken(UserDTO(user, tweetsUsuario(user))))
        ctx.json(UserDTO(user, tweetsUsuario(user)))

    }

    fun tweetsUsuario(user: User): List<Tweet> {
        val tweetsUsuario = twitterSystem.tweets.filter { it.user.id == user.id }
        return tweetsUsuario.toMutableList()
    }

    fun getUser(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)

        try {
            val userFound = twitterSystem.getUser(user.id)
            ctx.json(UserDTO(userFound, tweetsUsuario(userFound)))
        } catch (e: UserException) {
            throw NotFoundResponse("No existe usuario con ese id")
        }


    }

    fun register(ctx: Context) {
        val userDraftDTO = ctx.bodyValidator<DraftUserDTO>()
            .check({ draftUserDTO: DraftUserDTO -> draftUserDTO.username.isNotBlank() }, "El nombre no debe ser vacío")
            .check(
                { draftUserDTO: DraftUserDTO -> draftUserDTO.email.isNotBlank() && draftUserDTO.email.contains("@") },
                "Debe ingresar un mail válido"
            )
            .check({ draftUserDTO: DraftUserDTO -> draftUserDTO.password.isNotBlank() }, "Debe ingresar una contraseña")
            .check(
                { draftUserDTO: DraftUserDTO -> draftUserDTO.backgroundImage.isNotBlank() },
                "No es un formato válido de imagen"
            )
            .check(
                { draftUserDTO: DraftUserDTO -> draftUserDTO.image.isNotBlank() },
                "No es un formato válido de imagen"
            )
            .getOrThrow { throw BadRequestResponse("Los campos ingresados son inválidos") }

        val userDraft = DraftUser(
            userDraftDTO.username, userDraftDTO.email, userDraftDTO.password, userDraftDTO.image,
            userDraftDTO.backgroundImage
        )

        try {
            val newUser = twitterSystem.addNewUser(userDraft)

            ctx.header("Authorization", tokenService.createToken(UserDTO(newUser, tweetsUsuario(newUser))))
            ctx.json(UserDTO(newUser, tweetsUsuario(newUser)))
        } catch (e: UserException) {
            throw BadRequestResponse("El usuario o email al que está intentando registrarse ya se encuentra en uso")
        }
    }

    fun followingTws(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)

        try {
            val tweetsSeguidores = twitterSystem.getFollowingTweets(user.id)
            ctx.json((TweetsResultDTO(tweetsSeguidores)))
        } catch (e: UserException) {
            throw NotFoundResponse("Not found user id")
        }

    }

    fun userConID(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val userTk = tokenService.validateToken(token)
        val userConId = ctx.pathParam("{id}")
        val user =
            twitterSystem.users.find { it.id == userConId } ?: throw NotFoundResponse("No existe usuario con ese id")
        ctx.json(UserDTO(user, tweetsUsuario(user)))

    }

    fun getUserFollow(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val userTk = tokenService.validateToken(token)

        lateinit var userTokenConId: User

        try {
            userTokenConId = twitterSystem.getUser(userTk.id)
        } catch (e: UserException) {
            throw NotFoundResponse("No existe un usuario con el id dado")
        }
        try {
            val usersToFollows = twitterSystem.getUsersToFollow(userTokenConId.id)
            val usersToFollowsDTO = usersToFollows.map { SimpleUserDTO(it.id, it.username) }
            ctx.json(UsersResultDTO(usersToFollowsDTO))
        } catch (e: UserException) {
            throw BadRequestResponse("No hay seguidores para recomendar")
        }
    }



        fun followUser(ctx: Context) {
            val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
            val userToken = tokenService.validateToken(token)
            val userId = ctx.pathParam("{id}")

            lateinit var userConId: User
            lateinit var userTokenConId: User

            try {
                userConId = twitterSystem.getUser(userId)
            } catch (e: UserException) {
                throw NotFoundResponse("No existe un usuario con el id dado")
            }

            try {
                userTokenConId = twitterSystem.getUser(userToken.id)
            } catch (e: UserException) {
                throw NotFoundResponse("No existe un usuario con el id dado")
            }

            try {
                val userToggleFollow = twitterSystem.toggleFollow(userConId.id, userTokenConId.id)
                ctx.json(UserDTO(userToggleFollow, tweetsUsuario(userConId)))
            } catch (e: UserException) {
                throw BadRequestResponse("Can not follow to yourself")
            }

        }
    }




