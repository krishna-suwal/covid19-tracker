const externals = require( './externals' );
const rewire = require( 'rewire' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const defaults = rewire( 'react-scripts/scripts/build.js' );
const config = defaults.__get__( 'config' );
const path = require( 'path' );
const fs = require('fs');

/* we inject our Externals to keep our bundles clean and slim */
config.externals = {
   ...config.externals,
   ...externals,
};

/*
 * we set jsonFunction of webpack to our custom one
 * so multiple js bundles built with webpack could be safely loaded,
 * as we are aware that our plugin isn't the only one which can be potentially built with webpack.
 */
config.output.jsonpFunction = 'C19T_JSONP';

/* we disable chunks optimization because we want single js\css file to be loaded by plugin. */
config.optimization.splitChunks = {
   cacheGroups: {
      default: false,
   },
};
config.optimization.runtimeChunk = false;

const jsHashes = [];
const cssHashes = [];

const generatePhpArray = (arr, key, value, variable_name) => {
   arr = arr.map((item) => `        "${item[key]}" => "${item[value]}",`);
   arr = arr.join('\n');
   arr = `$${variable_name} = array(\n${arr}\n        );`;
   return arr;
}

config.output.filename = (pathData) => {
   const { name, contentHash } = pathData.chunk;
   
   jsHashes.push({
      name, hash: contentHash.javascript,
   });

   return `../assets/js/${name}.${contentHash.javascript}.js`;
};

// Prepare entry points.
const src = path.join(__dirname, '../src');
config.entry = {
   'map-view': path.join(src, 'map-view.js'),
   'graph-view': path.join(src, 'graph-view.js'),
   'table-view': path.join(src, 'table-view.js'),
};

/*
* lets find `MiniCssExtractPlugin` type of object in plugins array and redefine it's options.
* And remove all unnecessary plugins.
*/
const disabledPlugins = [
   'GenerateSW',
   'ManifestPlugin',
   'InterpolateHtmlPlugin',
   'InlineChunkHtmlPlugin',
   'HtmlWebpackPlugin',
];
config.plugins = config.plugins.reduce( ( plugins, pluginItem ) => {

   if ( disabledPlugins.indexOf( pluginItem.constructor.name ) >= 0 ) {
      return plugins;
   }

   if ( pluginItem instanceof MiniCssExtractPlugin ) {
      plugins.push(
         new MiniCssExtractPlugin( {
            moduleFilename: (props) => {
               const { name, contentHash } = props;

               cssHashes.push({
                  name, hash: contentHash['css/mini-extract'],
               });

               return `../assets/css/${name}.${contentHash['css/mini-extract']}.css`;
            },
         } )
      );
   } else {
      plugins.push( pluginItem );
   }

   return plugins;
}, [] );

config.plugins.push({
   apply: (compiler) => {
      compiler.hooks.done.tap( 'GeneratePhpIncFile', (compilation) => {
         const jsHashesPhpString = generatePhpArray(jsHashes, 'name', 'hash', 'scripts');
         const cssHashesPhpString = generatePhpArray(cssHashes, 'name', 'hash', 'styles');
         const html = `<?php

function c19t_get_hashed_assets() {
    ${jsHashesPhpString}
    ${cssHashesPhpString}

    return array(
        'scripts' => $scripts,
        'styles' => $styles,
    );
}
`;

         const generatedPhpFilename = 'hash-registry.php';

         fs.writeFile( path.join(__dirname, '../_inc', generatedPhpFilename), html, function (err) {
            if ( err ) {
               console.error( 'Error occurred while generating PHP Script file for hash registry...' );
               console.log(err);
               return;
            };
            console.log( 'Successfully generated PHP Script file for hash registry!' );
         });
      });
   }
 })