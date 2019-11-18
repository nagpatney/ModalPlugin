(function(){

    this.Modal = function(){
    
        this.closeButton =null;
        this.openButton = null;
        this.overlay =null;
        this.options=null;

        let defaults ={
            autoOpen:false,
            className: "fade-and-drop",
            closeButton:true,
            content:"",
            maxWidth:600,
            minWidth :200,
            overlay:true,
            primaryCta:"",
            secondaryCta:"",
            primaryCtaFunc:null,
            secondaryCtaFunc:null
        }

        // this.transitionEnd = transitionSelect();

        if(arguments[0] && typeof arguments[0] === 'object'){
            this.options = extendDefaults(defaults,arguments[0]);
        }
        if(this.options.autoOpen === true) this.open();
    }

    //public 
    Modal.prototype.close =function(){
        let self = this;
        this.modal.className = this.modal.className.replace(' open','');
        this.overlay.className = this.overlay.className.replace(' open','');
        this.modal.addEventListener('transitionend', function() {
            self.modal.parentNode.removeChild(self.modal);
          });
          this.overlay.addEventListener('transitionend', function() {
            if(self.overlay.parentNode) self.overlay.parentNode.removeChild(self.overlay);
          });
    }

    Modal.prototype.open = function(){
        buildDOM.call(this);
        initializeEvents.call(this);
        window.getComputedStyle(this.modal).height;
        this.modal.className = this.modal.className + (this.modal.offsetHeight >window.innerHeight ? ' open anchored' :' open');
        this.overlay.className = this.overlay.className +' open';
    }


    //private
    function extendDefaults(source, properties){
        let property;
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    }

    function buildDOM(){
        let content, contentHolder, docFrag,
        buttonHolder = document.createElement('div');
        
        if(typeof this.options.content === 'string'){
            content = this.options.content;
        }else{
            content=  this.options.content.innerHTML;
        }

        docFrag = document.createDocumentFragment();

        this.modal = document.createElement('div');
        this.modal.className = 'modal ' + this.options.className;
        this.modal.style.maxWidth = this.options.maxWidth + 'px';
        this.modal.style.minWidth = this.options.minWidth + 'px';

        if(this.options.closeButton){
            this.closeButton = document.createElement('button');
            this.closeButton.className = 'close-button';
            this.closeButton.innerHTML = 'X';
            this.modal.appendChild(this.closeButton);
        }

        if(this.options.overlay){
            this.overlay = document.createElement('div');
            this.overlay.className = 'overlay ' + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        contentHolder = document.createElement('div');
        contentHolder.className = 'content';
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        if(this.options.primaryCta.length){
            this.primaryButtonElem = document.createElement('button');
            this.primaryButtonElem.className ="primary-cta";
            this.primaryButtonElem.innerHTML = this.options.primaryCta;
            buttonHolder.appendChild(this.primaryButtonElem);
            buttonHolder.className = 'ctaHolder ' + this.options.className;
            this.modal.appendChild(buttonHolder);
        }

        if(this.options.secondaryCta.length){
            this.secondaryButtonElem = document.createElement('button');
            this.secondaryButtonElem.className ="secondary-cta"
            this.secondaryButtonElem.innerHTML = this.options.secondaryCta;
            buttonHolder.appendChild(this.secondaryButtonElem);
            buttonHolder.className = 'ctaHolder ' + this.options.className;
            this.modal.appendChild(buttonHolder);
            
        }

        docFrag.appendChild(this.modal);

        document.body.appendChild(docFrag);

        if(this.options.primaryCta.length){
            console.log('options')
            let self= this;
            this.primaryButtonElem.addEventListener('click',function(){
                if(self.options.primaryCta.length && self.options.primaryCtaFunc){
                    self.options.primaryCtaFunc.call(self);
                }
                
            });
            this.secondaryButtonElem.addEventListener('click',function(){
               
                if(self.options.secondaryCta.length && self.options.secondaryCtaFunc){
                    self.options.secondaryCtaFunc.call(self);
                }
            });
        }
    }

    function initializeEvents(){
        if(this.closeButton){
            this.closeButton.addEventListener('click',this.close.bind(this));
        }
        if(this.overlay){
            this.overlay.addEventListener('click',this.close.bind(this));
        }
     
    }
})();








