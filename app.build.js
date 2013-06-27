/*jslint false*/
({

  //If you only intend to optimize a module (and its dependencies), with
  //a single file as the output, you can specify the module options inline,
  //instead of using the 'modules' section above. 'exclude',
  //'excludeShallow', 'include' and 'insertRequire' are all allowed as siblings
  //to name. The name of the optimized file is specified by 'out'.
  include: [],
  excludeShallow: [],

  //As of RequireJS 2.0.2, the dir above will be deleted before the
  //build starts again. If you have a big build and are not doing
  //source transforms with onBuildRead/onBuildWrite, then you can
  //set keepBuildDir to true to keep the previous dir. This allows for
  //faster rebuilds, but it could lead to unexpected errors if the
  //built code is transformed in some way.
  keepBuildDir: true,

  //If set to true, any files that were combined into a build layer will be
  //removed from the output folder.
  removeCombined: false

	// Turn off UglifyJS so that we can view the compiled source
	// files (in order to make sure that we know that the compile
	// is working properly - for debugging only.)
  // optimize: "none"

})
