import { version } from '../../package.json';

export const environment = {
    peerDNS: {
        domain: 'http://localhost:3000',
        port: 3000
    },
    RTCConfiguration: {
        iceServers: [
            {
              urls: "stun:stun.relay.metered.ca:80",
            },
            {
              urls: "turn:a.relay.metered.ca:80",
              username: "a11170887bb910464bf219dc",
              credential: "pUawp/Lop4HtWOzX",
            }
        ],
        iceCandidatePoolSize: 10
    },
    version
};
