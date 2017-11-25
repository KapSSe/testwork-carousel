class TabHandler {

    constructor(){
        this.tabCollection = this.getTabCollection();
        this.viewsCollection = this.getViewsCollection();
        this.currentDisplayed = this.getCurrentDisplayed();
        this.returnData();
    }

    getTabCollection(){
        return document.querySelectorAll('.slider-tab-item')
    }

    getViewsCollection(){
        return document.querySelectorAll('.slider-view-item')
    }

    getTargetByIndex(index) {
        let target = this.viewsCollection[index-1];
        return target;
    }

    getCurrentDisplayed() {
       for(let i = 0; i < this.viewsCollection.length;i++){
        if(this.viewsCollection[i].dataset.visible === 'true'){
            return this.viewsCollection[i]
        }
       }
    }


    returnData(){
        for(let element of this.tabCollection){
             element.addEventListener('click',(e) => {
                let index = e.target.dataset.target;
                let target = this.getTargetByIndex(index);
                let current = this.currentDisplayed;
                return new Animator(index,target,current);
             })
        }
    }
}

class Animator {
    constructor(index,target,current){
        this.index = index;
        this.current = current;
        this.target = target;
        this.tlL = new TimelineLite();
        this.animate(this.current,this.target,this.tlL);
    }

    animate(current,target,tlL){
        current.dataset.visible = "false";
        target.dataset.visible = "true";
        return new TabHandler();
    }

}

const tabhandler = new TabHandler();
