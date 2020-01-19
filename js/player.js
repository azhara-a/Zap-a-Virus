game.Player = me.Sprite.extend({
    init: function() {
        const image = me.loader.getImage("player");
        this._super(me.Sprite, "init", [
            me.game.viewport.width / 2 - image.width / 2,
            me.game.viewport.height - image.height - 20,
            { image : image }
        ]);
        // this.shoot();
        this.velx = 450;
        this.maxX = me.game.viewport.width - this.width;

        me.timer.setInterval(this.shoot.bind(this), 700, true);
    },

    shoot: function() {
        me.game.world.addChild(me.pool.pull("laser", this.pos.x - game.Laser.width, this.pos.y - game.Laser.height))
    },

    update: function(time) {
        this._super(me.Sprite, "update", [time]);
        if (me.input.isKeyPressed("left")) {
            this.pos.x -= this.velx * time / 1000;
        }

        if (me.input.isKeyPressed("right")) {
            this.pos.x += this.velx * time / 1000;
        }

        // if (me.input.isKeyPressed("shoot")) {
        //     me.game.world.addChild(me.pool.pull("laser", this.pos.x - game.Laser.width, this.pos.y - game.Laser.height))
        // }

        this.pos.x = me.Math.clamp(this.pos.x, 0, this.maxX);

        return true;
    }
});