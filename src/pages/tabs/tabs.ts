import { Component } from '@angular/core';

import { GraphPage } from '../graph/graph';
import { MorePage } from '../more/more';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GraphPage;
  tab3Root = MorePage;

  constructor() {

  }
}
