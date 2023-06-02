# vue-app-scaffolding
> Standard frontend scaffolding for TOPdesk

## Getting Started

Use with NPM the `@topdesk/create-vue-app` initializer:

```bash
mkdir my-app
cd my-app
npm init @topdesk/vue-app
#Fill out the questions, or just keep pressing Enters. Your answers only affect the `package.json`.
```

...or just clone this repo and edit the `package.json` where `vue_app_scaffolding_` values are used.

## Try it out

The more important `npm run` scripts are:
* `npm run dev` - starts the dev server.
* `npm run analyze` - to see what ends up in your bundle. This allows you to keep track the cost of the packages you accumulate over time.
* `npm test` - title says it all.

## Customize the project

To keep the scaffolding simpler to maintain, it produces a single static project. This means that you need to manually apply some tweaks for your specific needs. Here is a quick checklist to help:
* Do you need multilinguality? Do you want to separate locale specific content from HTML?
    * If not, remove `src/vue-setup/i18n.ts` + wiring
    * Yes, but you want to fetch some or all your resources at runtime from a server: the vue-i18n plugin allows you to update the config at runtime.
* What routing mode you want?
    * [History API](https://css-tricks.com/using-the-html5-history-api/) (default) - Eg.: https://your-host.com/public-path/app/user-profile. Great for SPAs but your server needs to know about it: it has to redirect any sub-paths to your index allowing the client to handle all routing including `404`s. This server feature is often referred to as the _History API fallback_.
    * **hash-based routing** - Eg.: https://your-host.com/public-path/#app/user-profile. It doesn't need any special routing config on the server side, as it puts that information behind a # in the URL. Keep in mind that the part after the # is not sent to the server. **To use it adjust the option in `src/vue-setup/router.js`.**
* Want to get rid of explanation comments?
    * They are all in lines matching the `^\t*//.*$` regex in case you manually want to nuke them
		* Comments that are intended to stay (eg. ones for `ESLint`) use the `/* */` format

## F.A.Q

**Why not just use Vue CLI?**
> It's dead. :) The Vite initializer comes close in many ways, but it won't set up the rest of the tech-stack, such as Storybook, testing, or the Design System.

**Why are the generated project's plugins not based on questions?**
> Maintaining multiple possible fragments of the scaffolding would significally increase the maintenance cost. Instead its structure attempts to make it easy to tweak a generated project to your current needs.
