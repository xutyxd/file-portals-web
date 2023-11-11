import { version } from '../../package.json';

export const environment = {
    peerDNS: {
        domain: 'https://peer-dns.onrender.com',
        port: '443'
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
            },
            {
              urls: "turn:a.relay.metered.ca:80?transport=tcp",
              username: "a11170887bb910464bf219dc",
              credential: "pUawp/Lop4HtWOzX",
            },
            {
              urls: "turn:a.relay.metered.ca:443",
              username: "a11170887bb910464bf219dc",
              credential: "pUawp/Lop4HtWOzX",
            },
            {
              urls: "turn:a.relay.metered.ca:443?transport=tcp",
              username: "a11170887bb910464bf219dc",
              credential: "pUawp/Lop4HtWOzX",
            },
        ],
        iceCandidatePoolSize: 10
    },
    version
};
