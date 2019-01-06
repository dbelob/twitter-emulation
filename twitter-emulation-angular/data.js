module.exports = function () {
    return { 
        accounts: [
            { accountId: 1, username: "jsmith", password: "password", description: "John Smith" },
            { accountId: 2, username: "jdoe", password: "password", description: "John Doe" },
            { accountId: 3, username: "rroe", password: "password", description: "Richard Roe" },
            { accountId: 4, username: "alone", password: "password", description: "John Alone" }
        ],
        tweets: [
            { tweetId: 1, accountId: 1,
                text: "Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.",
                time: "2019-01-06T22:45:06+03:00" },
            { tweetId: 2, accountId: 1,
                text: "Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.",
                time: "2019-01-06T21:14:32+03:00" },
            { tweetId: 3, accountId: 1,
                text: "Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.",
                time: "2019-01-06T17:17:54+03:00" },
            { tweetId: 4, accountId: 1,
                text: "No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.",
                time: "2019-01-06T17:17:52+03:00" },
            { tweetId: 5, accountId: 1,
                text: "Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.",
                time: "2019-01-06T14:59:54+03:00" },
            { tweetId: 6, accountId: 1,
                text: "At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.",
                time: "2019-01-06T05:50:10+03:00" },
            { tweetId: 7, accountId: 2,
                text: "Some people care too much. I think it's called love.",
                time: "2019-01-06T05:50:10+03:00" },
            { tweetId: 8, accountId: 2,
                text: "You can't stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.",
                time: "2019-01-06T05:50:10+03:00" },
            { tweetId: 9, accountId: 2,
                text: "It is more fun to talk with someone who doesn't use long, difficult words but rather short, easy words like \"What about lunch?\"",
                time: "2019-01-06T05:50:10+03:00" }
        ],
        follower: [
            { whoAccountId: 1, whomAccountId: 2 },
            { whoAccountId: 1, whomAccountId: 3 },
            { whoAccountId: 2, whomAccountId: 1 }
        ]
    }
}
