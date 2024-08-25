export class AccountStatistics {
    constructor(
        public username?: string,
        public description?: string,
        public tweetsCount?: number,
        public followingCount?: number,
        public followersCount?: number,
        public follow?: boolean
    ) {
    }
}
