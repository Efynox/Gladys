/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */

module.exports = {
    
    /**
     * Get all modules
     */
    index: function(req, res, next){
      gladys.module.get()
            .then(function(modules){
                return res.json(modules);
            })  
            .catch(next);
    },
    
    /**
     * Install a given module
     */
    install: function(req, res, next){
        
        gladys.module.install(req.body);

        return res.json({message: 'Installation started with success'});
    },
    
    config: function(req, res, next){
        gladys.module.config({slug: req.params.slug})
          .then(function(){
              return res.json({success: true});
          })
          .catch(next);
    },
    
    uninstall: function(req, res, next){
        gladys.module.uninstall({id: req.params.id})
          .then(function(module){
              return res.json(module);
          })
          .catch(next);
    },

    upgrade: function(req, res, next){
        gladys.module.upgrade({id: req.params.id, version: req.body.version});
        return res.json({message: 'Upgrade started with success'});
    },

    getSettings: function(req, res, next){
        var params = {};
        for (const key in gladys.modules[req.params.slug].params) {
            if (key.hasOwnProperty(key)) {
                params[key] = gladys.param.getValue(key);
            }
        }
        return res.json(params);
    },

    saveSettings: function(req, res, next){
        
        for (const key in req.params) {
            if (key.hasOwnProperty(key)) {
                const value = object[key];
                gladys.param.setValue({ name: key, value: value });
            }
        }
        
        return res.json({message: 'Settings saved'});
    },
	
};

