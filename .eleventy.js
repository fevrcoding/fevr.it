const yaml = require('js-yaml');
const rss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  const assets = ['js', 'css', 'fonts', 'img', 'odx-assets', 'admin'];

  for (const folder of assets) {
    eleventyConfig.addPassthroughCopy({ [`static/${folder}`]: folder });
  }

  eleventyConfig.addPlugin(rss);

  eleventyConfig.addPassthroughCopy({ 'static/*.*': '.' });

  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents),
  );

  eleventyConfig.addNunjucksFilter('dateformat', (date, format) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(format);
  });

  eleventyConfig.addFilter('dateslug', (date) => {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat('yyyy/LL');
  });

  eleventyConfig.addNunjucksFilter('published', (posts) => {
    return posts.filter((post) => post.data.published);
  });

  eleventyConfig.addNunjucksFilter('limit', (posts, num) => {
    return posts.slice(0, num);
  });

  // redirect collection
  eleventyConfig.addCollection('redirects', function(collection) {
    const redirs = collection.getAll().filter(({ data }) => data.redirect_from);
    const redirects = new Map();
    for (item of redirs) {
      let { redirect_from } = item.data;
      if (!Array.isArray(redirect_from)) {
        redirect_from = [redirect_from];
      }
      redirect_from.forEach((from) => {
        redirects.set(from, {
          from,
          to: item.url,
        });
      });
    }
    return [...redirects.values()];
  });

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      includes: '_includes',
      layouts: '_layouts',
      input: 'src',
      output: '_site',
    },
  };
};