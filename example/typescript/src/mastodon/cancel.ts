import generator, { Response, Entity, isCancel } from 'megalodon'

declare var process: {
  env: {
    MASTODON_ACCESS_TOKEN: string
  }
}

const BASE_URL: string = 'https://mastodon.social'

const access_token: string = process.env.MASTODON_ACCESS_TOKEN

const client = generator('mastodon', BASE_URL, access_token)

client
  .search('whalebird', 'hashtags', null, null, null, true)
  .then((resp: Response<Entity.Results>) => {
    console.log(resp.data.hashtags)
  })
  .catch((err: Error) => {
    if (isCancel(err)) {
      console.log('Request was canceled')
    }
  })

setTimeout(() => {
  client.cancel()
}, 5000)
