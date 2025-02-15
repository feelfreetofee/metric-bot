// Pretty much useless since the webhook is send once an hour
import Queue from './queue'
// It can be replaced with fetch
const queue = new Queue

export function ExecuteWebhook(webhook, data) {
    return queue.push(`https://discord.com/api/webhooks/${webhook}`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}