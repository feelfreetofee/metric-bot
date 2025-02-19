import {fivemetrics} from './5metrics'
import {ExecuteWebhook} from './webhook'
import {FormatStats} from './format'

const metrics = new fivemetrics(Bun.env.API_KEY)

function watchResource(resource, cb, lastUpdated) {
    return metrics.getResource(resource).then(r => {
        if (r.lastUpdated === lastUpdated)
            return setTimeout(watchResource, Date.now() + 6e5, resource, cb, lastUpdated)
        cb(r)
        setTimeout(
            watchResource,
            r.lastUpdated + 36e5 + 6e4 - Date.now(),
            resource, cb, r.lastUpdated
        )
    })
    .catch(e => setTimeout(watchResource, Date.now() + 6e5, resource, cb, lastUpdated))
}

watchResource('es_extended', function(r) {
    ExecuteWebhook(Bun.env.WEBHOOK, {
        embeds: [
            {
                // This is an hexadecimal color, it can also be computed in runtime using:
                // (hex => parseInt(hex.slice(1), 16))('#38b4d8')
                color: 0x38b4d8,
                timestamp: new Date(r.lastUpdated).toISOString(),
                author: {
                    name: r.resource.name,
                    url: `https://5metrics.dev/resource/${r.resource.name}`,
                    icon_url: 'https://avatars.githubusercontent.com/u/22378232?v=4'
                },
                fields: [
                    FormatStats('server', r),
                    FormatStats('player', r)
                ]
            }
        ]
    })
})
