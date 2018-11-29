var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var fs = require('fs');

var webpackConfig = require('./config/webpack.config');

gulp.task('dist', dist);
gulp.task('clean', clean);
gulp.task('files', files);
gulp.task('webpack:dev-server', devServer);
gulp.task('webpack:build', build);

gulp.task('dev', gulp.series('dist', 'clean', 'files', 'webpack:dev-server'));
gulp.task('build', gulp.series('dist', 'clean', 'files', 'webpack:build'));

function files(done) {
  const staticStream = gulp.src('./static/**/*.*').pipe(gulp.dest('./dist/static'));
  staticStream.on('finish', done);
}

function clean(done) {
  fs.readdir('./dist', (err, files) => {
    if (err) console.log(err);
    const del = i => {
      if (i < files.length) {
        rimraf(`./dist/${files[i]}`, () => del(i + 1));
      } else {
        done();
      }
    };
    del(0);
  });
}

function dist(done) {
  fs.exists('./dist', exists => {
    if (exists) done();
    else {
      fs.mkdir('./dist', err => {
        if (!err) done();
        else throw err;
      });
    }
  });
}

function devServer(done) {
  const options = webpackConfig.devServer;

  WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);

  const wds = new WebpackDevServer(webpack(webpackConfig), options);
  wds.listen(webpackConfig.devServer.port, 'localhost', err => {
    if (err) throw new gutil.PluginError('webpack:dev-server', err);
    setTimeout(() => gutil.log(gutil.colors.green('Listening to server on localhost:' + webpackConfig.devServer.port)), 0);
    done();
  });
}

function build(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack:build', err);
    setTimeout(() => {
      gutil.log('webpack:build', stats.toString({
        colors: true,
        hash: false,
        entrypoints: false,
        assets: false,
        builtAt: false,
        version: false,
        modules: false,
      }));
    }, 0);
    done();
  });
}
