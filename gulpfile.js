var gulp = require("gulp");
var translate = require("gulp-translate");

// The configuration for the 'translate' plugin.
var translateConfig =
{
    templateLanguage: "php",
    allowDirectAnnotation: true,
    prefixIdsInContentFiles: true
};

/**
 * Exports the localizable content from the templates into a JSON file,
 * which can then be sent to a translation system. Here we also remove
 * the annotations to produce a normal HTML file for the base language.
 */
gulp.task("localize.export", function ()
{
    return gulp

        // Get the source files.
        .src(["./**/*.php", "./**/strings.json"])

        // Export localizable content from the template.
        .pipe(translate(translateConfig).export(
        {
            exportFilePath: "./translation/export/translation.json"
        }))

        // Write the destination file.
        .pipe(gulp.dest("./dist"));
});

/**
 * Imports the localized content from a JSON file received from a
 * translation system, into the templates.
 */
gulp.task("localize.import", function ()
{
    return gulp

        // Get the source files.
        .src(["./**/*.html", "./**/strings.json"])

        // Import localized content into the template.
        .pipe(translate(translateConfig).import(
        {
            importFilePath: "./translation/import/test.json"
        }))

        // Rename the destination file.
        .pipe(rename({ suffix: ".pseudo" }))

        // Write the destination file.
        .pipe(gulp.dest("./dist"));
});