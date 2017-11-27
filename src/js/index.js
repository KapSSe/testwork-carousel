document.addEventListener("DOMContentLoaded", function(){

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
            this.animate(this.current,this.target,this.tlL);
        }

        animate(current,target,tlL){
            current.dataset.visible = "false";
            target.dataset.visible = "true";
            return new TabHandler();
        }

    }

const tabhandler = new TabHandler();


    class Hoverer{
        constructor(){
            this.imageCollection = this.getimageCollection();
            this.headerCollection = this.getHeaderCollection();
            this.textCollection = this.getTextCollection();
            this.catchEvents();
        }
        getimageCollection() {
            return document.querySelectorAll('.img-scalable')
        }
        getHeaderCollection() {
            return document.querySelectorAll('.dragger-header')
        }
        getTextCollection() {
            return document.querySelectorAll('.dragger-text')
        }
        animate(currentHovered, currentDataIndex) {
            currentHovered.dataset.scale = 'true';
            let i = currentDataIndex - 1;
            this.headerCollection[i].dataset.shrink = "true";
            this.textCollection[i].dataset.shrink = "true";
            
        } 
        catchEvents(){
            let elem = document.querySelector('.dragger-carousel');
                elem.addEventListener('mouseover', (e) =>{
                    let currentHovered = e.target;
                    let currentDataIndex = e.target.dataset.image;
                    if(currentDataIndex != undefined ){
                        this.animate(currentHovered,currentDataIndex);
                    }
                },
                elem.addEventListener('mouseout', (e) => {
                    let currentDataIndex = e.target.dataset.image;
                    if(currentDataIndex != undefined ){
                        let i = currentDataIndex - 1;
                        e.target.dataset.scale = 'false';
                        this.headerCollection[i].dataset.shrink = "false";
                        this.textCollection[i].dataset.shrink  = "false";
                    }
                })
            )
        }
    }

    let hoverScaler = new Hoverer();

    class DraggerCarousel {
       constructor(){
        this.dragContainer = this.getDragContainer();
        this.dragItems = this.getDragItems()
        this.carouselFrame = this.getCarouselFrame();
        this.dragCatchTarget = this.getdragCatchTarget();
        this.drag();
       }
       getdragCatchTarget(){
           return document.querySelectorAll('.img-scalable')
       }
       getCarouselFrame(){
           return document.querySelector('.carousel');
       }
       getDragContainer(){
           return document.querySelector('.dragger-carousel');
       }
       getDragItems(){
           return document.querySelectorAll('.dragger-carousel-item');
       }
       drag(){
           for (let target of this.dragCatchTarget){
                target.addEventListener('mouseover',(e) => {
                        e.target.addEventListener('dragstart',(e) => {
                            let carousel = this.dragContainer;
                            this.iteratorStart = window.event.pageX;
                    })
                        e.target.addEventListener('dragend',(e) => {
                            this.iteratorEnd = window.event.pageX;
                            calculateDiff(e);
                    })
                    let calculateDiff = (e) => {
                        if(this.iteratorStart > this.iteratorEnd && e.target.dataset.image < 3){
                            for (let slides of this.dragItems){
                                //slides.dataset.dragvisible = 'true';
                                this.dragContainer.style.transform = "translateX(-102%)"
                                //this.dragContainer.classList.add('moveRight');
                                
                            }
                        }
                        if(this.iteratorStart < this.iteratorEnd && e.target.dataset.image > 3){
                            for (let slides of this.dragItems){
                                //slides.dataset.dragvisible = 'true';
                                this.dragContainer.style.transform = "translateX(0%)"
                                //this.dragContainer.classList.add('moveLeft');
                            }
                        }
                    }
                })
            }
       }
    }
    (() => {
        console.log(window.width);
            let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            let breakpoint = 1200;
            if (w > breakpoint){
                let draggercarousel = new DraggerCarousel();
            }
    })()
});


