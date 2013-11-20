function Biped (config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.bearing = {
        x: config.bearing.x || 0,
        y: config.bearing.y || 0
    };
    this.speed = speed || 0;
    
    // Possible values:
    // 0 = Alive
    // 1 = Infected
    // 2 = Undead
    // 3 = Dead
    this.status = config.status || 0;
    
    // Inventory
    this.items = config.items || [];
    this.maxItems = config.maxItems || 3;
    
    // Run next iteration of the simulation.
    this.tick = function () {
        // TODO
        // TODO: Update bearing
        
        this.move();
    }
    
    this.move = function () {
        this.x += (this.bearing.x * this.speed);
        this.y += (this.bearing.y * this.speed);
    }
    
    // Attack the given entity by calculating our attack stats and passing them
    // to the defending entity's defend() method.
    this.attack = function (target) {
        // TODO
    }
    
    // Defend against the given attack stats.
    this.defend = function (against) {
        // TODO
    }
    
    this.addItem = function (item) {
        if (this.maxItems > this.items.length - 1) return false;
        
        if (typeof(item) === "array") {
            for(var a in item) this.addItem(item[a]); 
        }
        // TODO: Check to make sure added objects are actually objects.
        this.items.push(item);
        
        return true;
    }
    
    // Use an item of the given type.
    this.useItem = function (type) {
        var i = 0, len = this.items.length, items = this.items;
        for(; i<len; i++) {
            if (items[i].type === type) {
                item.use(this);
                items.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    
    return this;
}