game.PlayScreen = me.ScreenObject.extend({
    /**
     * action to perform on state change
     */
    checkIfLoss : function (y) {
        if (y >= this.player.pos.y) {
           this.reset();
        }
    },

    onResetEvent : function () {
        
        me.game.world.addChild(new me.ImageLayer(0, 0, {
            image:"net",
            anchorpoint:(1, 1)
          }), 0);
      
        
        this.player = me.pool.pull("player");
        me.game.world.addChild(this.player, 1);
    
        this.enemyManager = new game.EnemyManager();
        // this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);

        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    },
    
    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function () {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
        this.player.alive = false;
        me.game.world.removeChild(this.player);
    }
});