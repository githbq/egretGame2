class ViewManager extends egret.Sprite {
	   public constructor() {
        super();
       
    }

    private static instance: ViewManager;
    private tripIndexPanel: TripIndexPanel; // 首页
    private tripPeoplePanel: TripPeoplePanel; //显示星座人物
    private tripSelectPanel: TripSelectPanel; //选择星座
    private tripCardPanel: TripCardPanel; //显示卡片
    

    /**
     * 这里初始化
     */
    private init() {
 
        this.tripIndexPanel = new TripIndexPanel();
        this.tripPeoplePanel = new TripPeoplePanel();
        this.tripSelectPanel = new TripSelectPanel();
        this.tripCardPanel = new TripCardPanel();
       
        this.tripIndexPanel.width= this.width;
        this.tripIndexPanel.height= this.height;

        this.tripPeoplePanel.width= this.width;
        this.tripPeoplePanel.height= this.height;

        this.tripSelectPanel.width= this.width;
        this.tripSelectPanel.height= this.height;

        this.tripCardPanel.width= this.width;
        this.tripCardPanel.height= this.height;

        this.addChild(this.tripIndexPanel);
        this.tripIndexPanel.start();
         
    }

    public start() {
        
        this.init();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    }

    //传入类型与对象
    public order(_type: any, _object: any) {
        var changeEvent: ChangeSceneEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = _type;
        changeEvent.obj = _object;
        this.dispatchEvent(changeEvent);

    }

    public static getInstance(): ViewManager {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }

        return ViewManager.instance;
    }

    public onChangeScene(e: ChangeSceneEvent) {

        e.obj.end();
        switch (e.eventType) {
            case TripIndexPanel.TRIP_INDEX:
              this.removeChildren();
                this.tripSelectPanel.start();
                this.addChild(this.tripSelectPanel);

                break;
            case TripSelectPanel.TRIP_SELECT:
             
                this.tripPeoplePanel.start();
                this.addChild(this.tripPeoplePanel);

                break;
            case TripPeoplePanel.TRIP_PEOPLE:
              
                this.tripCardPanel.start();
                this.addChild(this.tripCardPanel);

                break;
            case TripCardPanel.TRIP_CARD:
                 this.removeChildren();
                this.tripIndexPanel.start();
                this.addChild(this.tripIndexPanel);

                break;
            default:
                break;
        }


    }
}