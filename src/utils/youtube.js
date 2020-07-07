import YouTube from 'simple-youtube-api'
import isUrl from 'isurl'

const youtube = new YouTube(process.env.YOUTUBE)

export const search = (video) => {
    return new Promise((resolve, reject) => {
        if (isUrl(video)) {
            resolve(youtube.getVideo(video))
                .then(result => result)
        } else {
            resolve(youtube.searchVideos(video, 5))
                .then(results => results)
        }
    })
}