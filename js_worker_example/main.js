(function(window, undefined){
    window.loadingIndicator = {
        // 720,720 is a highly composite number (lots of factors, perfect for this example)
        number: 720720 * 720720 * 720720,
        ui: { // our important DOM nodes
            loadingBar: null,
            button: null,
            factors: null
        },
        // our web worker instance
        worker: null,
        // call this from the page
        init: function(){
            this.bindEvents();
        },
        // bind document events
        bindEvents: function(){
            var self = this;
            document.addEventListener('DOMContentLoaded', function(){
                self.setUiElements();
                // bind click event for our button
                self.ui.button.addEventListener('click', self.buttonClicked.bind(self));
                // create the worker
                self.worker = self.createLoadingThread();
            });
        },
        // when we click the button, this adds a span, helping
        // demonstrate the 'non-blocking'ness of the worker
        buttonClicked: function(){
            var span = document.createElement('span');
            var br = document.createElement('br');
            span.innerHTML = 'You clicked me!';
            this.ui.button.parentNode.append(br);
            this.ui.button.parentNode.append(span);
        },
        // set our ui map to nodes
        setUiElements: function(){
            this.ui.loadingBar = document.getElementsByClassName('loading-bar-value')[0];
            this.ui.button = document.getElementsByTagName('button')[0];
            this.ui.factors = document.getElementById('factors');
        },
        // create our worker
        createLoadingThread: function(){
            var worker = new Worker('worker.js');
            worker.onmessage = this.respondToUpdate.bind(this);
            // send worker number to factor
            worker.postMessage(this.number);
            return worker;
        },
        //respond to messages from the worker (new factor found)
        respondToUpdate: function(event){
            // set width to percentage of completion
            this.ui.loadingBar.style.width = String(event.data.percentage) + '%';
            // loading completed
            if(event.data.percentage >= 100){
                this.completed(event);
            }
        },
        // clean up when worker is done
        completed: function(event){
            this.worker.terminate();
            // remove other elements except indicator
            this.ui.button.parentNode.removeChild(this.ui.button);
            // removing shifts entire list up, so we can just keep
            // removing the first element
            var spans = document.getElementsByTagName('span');                
            while(spans.length){
                spans[0].parentNode.removeChild(spans[0]);
            }
            var brs = document.getElementsByTagName('br');
            while(brs.length){
                brs[0].parentNode.removeChild(brs[0]);
            }
            this.ui.factors.innerHTML = 'Factors of ' + this.number + ': ' + event.data.factors.join(', ');
        }
    };
})(window, undefined);