LX.PieMenu = class PieMenu extends LV.EventEmitter {

    constructor() {
        super();
        this._locked = false;
        this.wheel = null;
        this.element = document.getElementById("pie-menu");
        this.mask_element = document.getElementById("pie-menu-mask");
        this.mask_element.onclick = () => {
            this.close();
        };
    }    

    /**
    * Display menu on canvas on top of a mask
    */
    open(items, pos) {
        if (!items || !items.length) {
            return console.log("[PieMenu] Refusing to show menu with zero items");
        }

        if (this._locked) {
            return console.log("[PieMenu] Refusing to open while menu is in locked state");
        }


        // create icons for menu
        let final_items = [];

        items.forEach((item) => {
            if (item.icon) {
                let icon = "imgsrc:/_/@fortawesome/fontawesome-free/svgs/solid/" + item.icon + ".svg";
                final_items.push(icon);                
            }
            else if (item.label) {
                final_items.push(item.label);
            }
        });

        // create wheel menu
        this.wheel = new wheelnav("pie-menu");
        this.wheel.titleWidth = 22;
        this.wheel.navAngle = 30;
        this.wheel.wheelRadius = 100;
        this.wheel.selectedNavItemIndex = null;;
        this.wheel.createWheel(final_items);

        // define custom methods to handle menu selection
        this.wheel.navItems.forEach((item) => {
        
            item.navigateFunction = () => {
                let matched_item = items[item.itemIndex];

                let event_data = null;
                if(matched_item.method) {
                    event_data = matched_item.method();
                }
                if (matched_item.event) {
                    this.emit(matched_item.event, event_data);
                }
                this.close.call(this);
            }
        });

        // create mask for behind the menu
        this.mask_element.classList = "active";

        // set x/y location for pie menu
        if(pos.x && pos.y) {
            let svg = this.element.childNodes[0];
            let width = svg.width.baseVal.valueAsString;
            let height = svg.height.baseVal.valueAsString;
            this.element.style.left = (pos.x - width/2)+"px";
            this.element.style.top = (pos.y - height/2)+"px";
        }

        this.element.classList = "active";
        this.emit("open");
    }
    
    /**
    * Hide menu from canvas and remove mask
    */
    close() {
        this.element.classList.remove("active")
        this.mask_element.classList.remove("active");
        this.emit("close");
    }


    lock() {
        this._locked = true;
        this.emit("lock");
    }

    unlock() {
        this._locked = false;
        this.emit("unlock");
    }

    isLocked() {
        return this._locked;
    }
}
