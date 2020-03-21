module.exports = {
  plugins: [
    require("tailwindcss"),
    ...(process.env.NODE_ENV === "production"
      ? [
          require("@fullhuman/postcss-purgecss")({
            content: ["./src/**/*.js", "./public/**/*.html"],
            defaultExtractor: content => {
              return content.match(/[\w-/.:]+(?<!:)/g) || []
            }
          })
        ]
      : [])
  ]
}
