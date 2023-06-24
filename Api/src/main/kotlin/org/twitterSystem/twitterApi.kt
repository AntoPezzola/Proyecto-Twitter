package org.twitterSystem

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.security.RouteRole
import org.unq.TwitterSystem
import org.unq.initTwitterSystem
internal enum class Roles : RouteRole {
    ANYONE, USER
}
fun main(args: Array<String>) {
    ApiTwitterSystem().start()
}
class ApiTwitterSystem() {

    val twitterSystem: TwitterSystem = initTwitterSystem()

    fun start() {
        val tokenService = TokenService(twitterSystem)
        val tweetsControler = TweetsController(twitterSystem, tokenService)
        val userController = UserController(twitterSystem, tokenService)
        val app = Javalin.create { config ->
            config.http.defaultContentType = "application/json"
            config.accessManager(tokenService::validate)
            config.plugins.enableCors { cors -> cors.add { it.anyHost() } } }.start()
        app.before{
            it.header("Access-Control-Expose-Headers", "*")
        }

        app.routes {
            path("login") {
                post(userController::login, Roles.ANYONE)
            }
            path("register") {
                post(userController::register, Roles.ANYONE)
            }

            path("user") {
                get(userController::getUser, Roles.USER)

                path("/usersToFollow") {
                    get(userController::getUserFollow, Roles.USER)
                }

                path("/followingTweets") {
                    get(userController::followingTws, Roles.USER)
                }

                path("/{id}") {
                    get(userController::userConID, Roles.USER)

                    path("/follow") {
                        put(userController::followUser, Roles.USER)
                    }
                }

            }

            path("search") {
                get(tweetsControler::getTweets, Roles.USER)
            }

            path("trendingTopics") {
                get(tweetsControler::getTrendigTws, Roles.USER)
            }
            path("tweet") {
                post(tweetsControler::agregarTw, Roles.USER)

                path("/{id}") {
                    get(tweetsControler::traerTw, Roles.USER)

                    path("/like") {
                        put(tweetsControler::likeTweet, Roles.USER)
                    }

                    path("/retweet") {
                        post(tweetsControler::retweet, Roles.USER)
                    }

                    path("/replay") {
                        post(tweetsControler::replayTweet, Roles.USER)
                    }
                }
            }

        }
    }
}


