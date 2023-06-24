package org.twitterSystem

import org.unq.Tweet
import org.unq.TweetType
import org.unq.User
import java.time.LocalDateTime

class UserLoginDTO(val username: String, val password: String)


class UserDTO (usuario: User, tweets: List<Tweet>) {
        val id = usuario.id
        val username  = usuario.username
        val email = usuario.email
        val image = usuario.image
        val backgroundImage = usuario.backgroundImage
        val followers = usuario.followers.map { SimpleUserDTO(it.id, it.username) }
        val following = usuario.following.map { SimpleUserDTO(it.id, it.username) }
        val tweets = tweets.map { SimpleTweetDTO(it) }
}

class UsersResultDTO(val user : List<SimpleUserDTO>)

class DraftUserDTO( val username : String , val email : String , val password: String, val image : String, val backgroundImage : String )

class SimpleUserDTO(val id: String, val username: String)


class SimpleTweetDTO(tweet: Tweet) {
    val id = tweet.id
    val type = TwitterTypeDTO(tweet.type)
    val user = SimpleUserDTO(tweet.user.id, tweet.user.username)
    val content = tweet.content
    val date = tweet.date.toString()
    val repliesAmount = tweet.replies.size
    val retweetAmount = tweet.reTweets.size
    val likes = tweet.likes.map { SimpleUserDTO(it.id, it.username) }

}
class TwitterTypeDTO(t: TweetType) {
    val tweet = if (t.tweet !== null) { SimpleTweetDTO(t.tweet!!) }
                else { null }
    val image = t.image

}

class TweetsResultDTO(tweets : List<Tweet>) {
    val result = tweets.map {SimpleTweetDTO(it)}
}

class AddTwTDO(val content : String , val image: String? ) {
}
 class TweetDTO(tweet: Tweet) {
     var id = tweet.id
    var type = TwitterTypeDTO(tweet.type)
    var user = SimpleUserDTO(tweet.user.id, tweet.user.username)
    var content = tweet.content
    var date = tweet.date
    var likes = tweet.likes.map {
        val userLike = SimpleUserDTO(it.id, it.username)
        SimpleUserDTO(userLike.id, userLike.username)
    }
    var replies = tweet.replies.map { SimpleTweetDTO(it) }
    var retweet = tweet.reTweets.map { SimpleTweetDTO(it) }
}

class AddReplyTweetDTO(val content : String, val image : String?)
class AddReTweetDTO(val content : String)