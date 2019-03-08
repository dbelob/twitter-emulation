import { Component, OnInit } from '@angular/core';

export class Tweet {
  constructor(
    public accountUsername?: string,
    public accountDescription?: string,
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
    new Tweet('John Doe', 'jdoe', 'Some people care too much. I think it\'s called love.', new Date()),
    new Tweet('John Smith', 'jsmith', 'Lorem ipsum dolor sit amet, impetus iuvaret in nam. Inani tritani fierent ut vix, vim ut dolore animal. Nisl noster fabellas sed ei.', new Date()),
    new Tweet('John Doe', 'jdoe', 'You can\'t stay in your corner of the Forest waiting for others to come to you. You have to go to them sometimes.', new Date()),
    new Tweet('John Smith', 'jsmith', 'Duo suas molestiae ea, ex sit rebum voluptua. Graeci mandamus ad mei, harum rationibus qui at. Ut vel fabellas deserunt senserit.', new Date()),
    new Tweet('John Doe', 'jdoe', 'It is more fun to talk with someone who doesn\'t use long, difficult words but rather short, easy words like "What about lunch?"', new Date()),
    new Tweet('John Smith', 'jsmith', 'Vel eros vero cu, at vis animal ceteros. Veritus invidunt postulant qui ne. Mel latine patrioque necessitatibus id, ius ne adhuc maluisset.', new Date()),
    new Tweet('John Smith', 'jsmith', 'No per viderer invidunt consequat, vix ei probo oratio luptatum, quo stet graece an. Has in nemore partiendo.', new Date()),
    new Tweet('John Smith', 'jsmith', 'Decore ocurreret te vis, eligendi scaevola no vel. Brute hendrerit duo ne. Molestie percipitur adversarium quo ut.', new Date()),
    new Tweet('John Smith', 'jsmith', 'At nobis voluptaria sed, quo at eius laudem gloriatur, ne sapientem salutandi pro. Erat quaeque electram vim at.', new Date()),
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
