var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        _super.call(this);
    }
    var d = __define,c=ViewManager,p=c.prototype;
    /**
     * 这里初始化
     */
    p.init = function () {
        this.tripIndexPanel = new TripIndexPanel();
        this.tripPeoplePanel = new TripPeoplePanel();
        this.tripSelectPanel = new TripSelectPanel();
        this.tripCardPanel = new TripCardPanel();
        this.tripIndexPanel.width = this.width;
        this.tripIndexPanel.height = this.height;
        this.tripPeoplePanel.width = this.width;
        this.tripPeoplePanel.height = this.height;
        this.tripSelectPanel.width = this.width;
        this.tripSelectPanel.height = this.height;
        this.tripCardPanel.width = this.width;
        this.tripCardPanel.height = this.height;
        this.addChild(this.tripIndexPanel);
        this.tripIndexPanel.start();
    };
    p.start = function () {
        this.init();
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.onChangeScene, this);
    };
    //传入类型与对象
    p.order = function (_type, _object) {
        var changeEvent = new ChangeSceneEvent(ChangeSceneEvent.CHANGE_SCENE_EVENT);
        changeEvent.eventType = _type;
        changeEvent.obj = _object;
        this.dispatchEvent(changeEvent);
    };
    ViewManager.getInstance = function () {
        if (ViewManager.instance == null) {
            ViewManager.instance = new ViewManager();
        }
        return ViewManager.instance;
    };
    p.onChangeScene = function (e) {
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
    };
    return ViewManager;
}(egret.Sprite));
egret.registerClass(ViewManager,'ViewManager');
