import { Component, OnInit } from '@angular/core';

export class Tweet {
  constructor(
    public id?: number,
    public accountId?: number,
    public text?: string,
    public time?: Date
  ) {
  }
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  private tweets: Tweet[] = [
    new Tweet(1, 1, 'Some people care too much. I think it\'s called love.', new Date()),
    new Tweet(2, 1, 'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.', new Date()),
    new Tweet(3, 1, 'You can\'t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.', new Date()),
    new Tweet(4, 1, 'Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.', new Date()),
    new Tweet(5, 1, 'It is more fun to talk with someone who doesn\'t use long, difficult words but rather short, easy words like "What about lunch?"', new Date()),
    new Tweet(6, 1, 'Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.', new Date()),
    new Tweet(7, 2, 'No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.', new Date()),
    new Tweet(8, 2, 'Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.', new Date()),
    new Tweet(9, 2, 'At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.', new Date()),
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
