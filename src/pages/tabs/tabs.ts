import {Component,ViewChild} from '@angular/core';
import {HomePage, Market, MePage} from '../index';
import {Tabs, ModalController,NavParams} from 'ionic-angular';
import {DataApi} from '../../providers/index';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('mainTabs') tabRef:Tabs;

    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = Market;
    tab3Root: any = MePage;
    isnewshop :boolean = true;
    public tabId: number;
    public selectTabIndex: number;
    constructor(public modalCtrl: ModalController,public navParams: NavParams,private api: DataApi) {
      let value = navParams.get("isnewshop");
      if (value!=undefined) {
        this.isnewshop = value;
      }
      this.tabId = navParams.get("tabId");
      if(this.tabId != undefined || this.tabId !=null){
        this.selectTabIndex = this.tabId;
      }
    }
    changeTabs = function () {
        console.log("tab changed");
    };
    // 选中tab页后的事件
    // selectFriend() { // 声明一个modal
    //     let modal = this.modalCtrl.create(ListPage);
    //     // 弹出modal
    //     modal.present();
    // }
    //
    // ionViewDidEnter() {
    //     let mainTabs = this.tabRef;
    //     mainTabs.select(1);
    // }
}
