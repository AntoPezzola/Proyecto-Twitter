package org.twitterSystem

import io.javalin.http.*
import org.unq.*
import java.time.LocalDateTime


class TweetsController(val twitterSystem: TwitterSystem, private val tokenService : TokenService) {


    fun getTweets(ctx : Context) {
        val textoObtenido = ctx.queryParam("text")
        val tweetsFiltrados = twitterSystem.search(textoObtenido!!)
        ctx.json(TweetsResultDTO(tweetsFiltrados))
    }

    fun getTrendigTws(ctx: Context) {
        val twtsSistema = twitterSystem.getTrendingTopics()

        ctx.json(TweetsResultDTO(twtsSistema))
    }

    fun agregarTw(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)
        val tw = ctx.bodyValidator<AddTwTDO>()
            .check({ tweetDTO: AddTwTDO -> tweetDTO.content.isNotBlank()} , "Debe ingresar un texto")
            .getOrThrow { throw BadRequestResponse("Debe ingresar un tweet") }

        try {
            val newTw = twitterSystem.addNewTweet(DraftTweet(user.id, tw.content, tw.image, LocalDateTime.now()))
            ctx.json(TweetDTO(newTw))
        } catch (e: UserException) {
            throw NotFoundResponse("Not found user id")
        }

    }

    fun traerTw(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)
        val twID = ctx.pathParam("{id}")

        try {
            val tweetConId = twitterSystem.getTweet(twID)
            val tweetBuscado = twitterSystem.getTweet(tweetConId.id)
            ctx.json(TweetDTO(tweetBuscado))
        } catch (e: TweetException) {
            throw NotFoundResponse("No existe un tweet con ese id")
        }
    }

    fun likeTweet(ctx: Context) {
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)
        val twID = ctx.pathParam("{id}")

        try {
            val tw = twitterSystem.toggleLike(twID, user.id)
            ctx.json(TweetDTO(tw))
        } catch (e:UserException){
            throw NotFoundResponse("No existe un usuario con ese id")
        } catch (e: TweetException) {
            throw NotFoundResponse("No existe un tweet con ese id")
        }

    }

    fun retweet(ctx : Context){
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)
        val twID = ctx.pathParam("{id}")
        val body = ctx.bodyValidator<AddReTweetDTO>().check(
            {addReTwDTO -> addReTwDTO.content.isNotBlank()}, "El texto no debe ser vacío")
            .getOrThrow { throw BadRequestResponse("Debe ingresar un retweet válido") }

        lateinit var tweetRe: Tweet


        try {
            tweetRe = twitterSystem.getTweet(twID)
        } catch (e: TweetException) {
            throw NotFoundResponse("No existe un tweet con ese id")
        }

        try {
            val newRetw = twitterSystem.addReTweet(DraftReTweet(user.id, tweetRe.id, body.content, LocalDateTime.now()))
            ctx.json(TweetDTO(newRetw))
        } catch (e: TweetException) {
            throw BadRequestResponse("Can not retweet your own tweet")
        } catch (e: UserException) {
            throw NotFoundResponse("No existe un usuario con ese id")
        }

    }


    fun replayTweet(ctx: Context){
        val token = ctx.header("Authorization") ?: throw UnauthorizedResponse("Usuario invalido")
        val user = tokenService.validateToken(token)
        val tw = ctx.bodyValidator<AddReplyTweetDTO>()
            .check({ tweetDTO: AddReplyTweetDTO -> tweetDTO.content.isNotBlank()} , "Debe ingresar un texto")
            .get()
        val twID = ctx.pathParam("{id}")

        try {
            val replay = twitterSystem.replyTweet(DraftReplyTweet(user.id, twID, tw.content, tw.image,  LocalDateTime.now()))
            ctx.json(TweetDTO(replay))
        } catch (e:UserException) {
            throw NotFoundResponse("No existe un usuario con ese id")
        } catch (e: TweetException) {
            throw NotFoundResponse("No existe un tweet con ese id")
        }

    }

}