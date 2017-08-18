fis.require('jello')(fis);

// 标记 staitc/libs 下面的 js 为模块化代码。
fis.match('/static/libs/**.js', {
  isMod: true
});

fis.match('/static/libs/esl/esl.js', {
  isMod: false
});

fis.match('/static/libs/jquery/jquery.js', {
    id: 'jquery'
});


// jello 里面默认用的 commonjs 这里改成 amd 方案。
fis.unhook('commonjs');
fis.hook('amd', {
  packages: [

    // 用来存放 libs 库
    {
      name: 'libs',
      location: 'static/libs/',
      main: 'index'
    }
  ]
});

// 设置 *.scss 配置配置项
fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass', {
    include_paths: [
      './static/scss',
      './components/compass-mixins'
    ]
  })
});

// 不启用 less
fis.match('*.less', {
  parser: null
});

// // 解析 markdown，编译成 html
// fis.match('*.md', {
//   parser: fis.plugin('marked'),
//   rExt: '.html'
// });

fis.match('::package', {
  prepackager: fis.plugin('addvmrequire', {
  }),
  // spriter: fis.plugin('csssprites-plus', {
  //     margin: 10,
  //     layout: 'matrix',
  //     to: './img'
  // })
})
.match('*.{vm,js}', {
    useSameNameRequire: true
})

// 对 CSS 进行图片合并
fis.match('*.scss', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});



fis.media('prod')
  .match('::package', {
    // 关于打包配置，请参考：https://github.com/fex-team/fis3-packager-deps-pack
    packager: fis.plugin('deps-pack', {
      'pkg/frame.css': [
        '/static/scss/**.css',
        '/static/scss/**.scss',
        // 'page/layout/frame.vm',
        // 'page/layout/frame.vm:deps',
      ],
      'pkg/front.css': [
        '/widget/header/header.scss',
        // 'page/layout/front.vm',
        // 'page/layout/front.vm:deps',
        '!pkg/frame.css:deps'
      ],
      'pkg/base.js': [
        'static/js/esl.js',
        'components/jquery/jquery.js'
      ],
      'pkg/foo.js': [
        // 'page/my/foo.vm',
        // 'page/my/foo.vm:deps',
        'page/my/foo.js',
        'page/my/foo.js:deps'
      ],
      'pkg/foo.css': [
        'page/my/foo.vm:deps'
      ],
      'pkg/bar.js': [
        // 'page/my/bar.vm',
        // 'page/my/bar.vm:deps',
        'page/my/bar.js',
        'page/my/bar.js:deps'
      ],
      'pkg/bar.css': [
        'page/my/bar.vm:deps'
      ]
    })
  })
