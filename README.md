## How to use this repo

This repository acts as both a tutorial and a development environment for custom
scripting in AEL's instance of Mozilla Hubs. To get started,
[create a repository from this template](https://github.com/aelatgt/hubs-scripting-guide/generate)
and follow the guide below. You can then add new components and room scripts to
the existing structure, or create your own development environment.

## Table of Contents

1. [Running the Development Server](#running-the-development-server)
2. [Adding Scripts to Hubs](#adding-scripts-to-hubs)
3. [Custom Components](#custom-components)
4. [Visually Positioning Entities](#visually-positioning-entities)
5. [Networking](#networking)
6. [Interaction](#interaction)
7. [Publishing Scripts](#publishing-scripts)

The sample code is structured as follows:

<pre>
<a href="./src/">src/</a>
├─ <a href="./src/components/">components/</a> - A-Frame component definitions
├─ <a href="./src/entities/">entities/</a> - Sample glTF files from the Hubs Entity Generator
├─ <a href="./src/rooms/">rooms/</a> - Hubs room scripts
</pre>

## Running the Development Server

After installing Node.js (and optionally `yarn`) run the following commands:

```bash
# 1. Install dependencies

yarn
# OR
npm install


# 2. Run development server

yarn start
# OR
npm start
```

This will start a static file server on port 1234 that serves files in the
`/src` directory. Additionally, it will connect this server to
[Ngrok](https://ngrok.io) so it's accessible outside your local network.

> To customize this behavior, see [`start.js`](./start.js)

## Adding Scripts to Hubs

The Hubs client hosted on [hubs.aelatgt.net](https://hubs.aelatgt.net) has been
modified to support attaching custom scripts to each room. These scripts will
execute during the page load sequence before connecting to the networked scene.
This allows you to add new forms of interactivity to Hubs without needing to
build the client from source.

### Instructions

1. Click the hamburger menu in the top-left
2. Select **Room Settings**
3. At the bottom of the room settings dialog box, paste the public URL to a
   script
4. Click **add** to append this URL to the list of scripts
5. Click **Apply** to save the room settings
6. Refresh the page to see the effects of the script(s)

![Screenshot of custom script input field](https://i.imgur.com/j6IrzWH.png)

At this time only certain hosts are supported for script URLs:

- [Ngrok](https://ngrok.com) - for development on local server
- [Glitch](https://glitch.com) - cloud based development tool
- [GitHub Pages](https://pages.github.com/) - for finished scripts

Any assets referenced from your scripts, such as images and 3D models, should
also be served from an approved domain.

### Try it!

Create a new room from the
[Wide Open Space](https://hubs.aelatgt.net/scenes/BNKgTxW/wideopenspace) scene.
We recommend testing with this scene since it's minimal and spawns you near the
origin.

Start the development server and visit the public URL for the `rooms` folder
that's printed to the console. This page shows a listing of each of your room
scripts. Copy the URL for the `1-basic.js` room script and paste it into the
room settings as described above.

Refresh the page and you should see a red box appear near the center of the
room:

<p align="center">
<img src="https://i.imgur.com/a73GkTV.png" alt="Red box floating above the ground" height=300 />
</p>

Take a look at the [`1-basic.js`](./src/rooms/1-basic.js) script to understand
how it works. This file uses basic JavaScript and DOM APIs to construct an
A-Frame entity, give it properties, and add it to the scene.

> Refer to the A-Frame
> [scene graph documentation](https://aframe.io/docs/1.2.0/introduction/javascript-events-dom-apis.html#modifying-the-a-frame-scene-graph)
> to learn more about converting from HTML to JavaScript

## Custom Components

Anything you can do in a regular A-Frame scene will work in Hubs, including
adding custom components. The
[`2-custom-component.js`](./src/rooms/2-custom-component.js) room script shows
an example of a custom component that attaches a material from Three.js to an
entity. Notice that we store each component definition in a separate file inside
the `components` folder and import them into the room script. This pattern
allows us to write multiple room scripts that use the same component.

> Refer to the A-Frame
> [component documentation](https://aframe.io/docs/1.2.0/core/component.html) to
> learn more about what you can do with custom components.

## Visually Positioning Entities

Hard-coding properties like position, rotation, and scale can grow tiresome and
makes it difficult to contextualize where an entity lives in your scene. A
better approach is to position entities through a visual interface.

### Option 1: Hubs Entity Generator

Our [Hubs Entity Generator](https://www.aelatgt.org/hubs-entity-generator/) can
create a `.glb` file that contains arbitrary component data attached to an empty
object. This file can then be loaded into Spoke and positioned just like a 3D
model.

[![Hubs Entity Generator application](https://i.imgur.com/ni5xPRW.png)](https://www.aelatgt.org/hubs-entity-generator/)

> For complete instructions, refer to the project's
> [README](https://github.com/aelatgt/hubs-entity-generator).

The [`3-entity-generator.js`](./src/rooms/3-entity-generator.js) and
[`4-root-component.js`](./src/rooms/4-root-component.js) scripts demonstrate two
ways of using the entity generator. The `entities` folder contains sample `.glb`
files that accompany these scripts. For instance, after loading
`3-entity-generator.js` into a room, you can drag `entity-3.glb` into the room
to make the entity appear.

> ⚠️ Dragging an entity `.glb` into a running Hubs room can be a useful trick
> during development, but Hubs' default networking and interactions on 3D
> objects can conflict with custom networking or interaction scripts. Instead,
> you should upload and position these `.glb` files through Spoke so that no
> default behavior is attached.

We recommend following the pattern from
[`4-root-component.js`](./src/rooms/4-root-component.js) by writing a root
component for each entity that attaches all other components in its `init`
function. This way you can update the structure of your entity without needing
to export a new `.glb` file or re-publish the Spoke scene.

### Option 2: Hubs Blender Exporter

<img src="https://i.imgur.com/EvERDbj.png" alt="Annotated Blender sidebar" align="right" height=300 />

If you're already creating your scene in Blender, you can use the official
[Hubs Blender extension](https://github.com/MozillaReality/hubs-blender-exporter)
to attach components to objects in your Blender scene.

By default, only a few built-in components are provided. You can create your own
JSON config file to support custom components and their properties by following
the structure of the
[default config file](https://github.com/MozillaReality/hubs-blender-exporter/blob/master/default-config.json).
The config file can be swapped from the **Hubs** panel in the **Scene** tab of
Blender's sidebar.

## Networking

Many components work perfectly fine running independently on each user's device,
however more complex interactivity may require networking. Hubs uses a fork of
[`networked-aframe`](https://github.com/MozillaReality/networked-aframe) for
networked interactions.

Adding custom networked behaviour requires a few basic steps:

1. Append a new `<template>` into the existing `<a-assets>`
2. Register a new schema for this template with networked-aframe (NAF)
3. Add the `networked` component to an entity using that template

> ⚠️ NAF templates must follow a specific naming convention in order to work on
> Hubs. The most common one is to end template names with a `-media` suffix.

The [`5-networking.js`](./src/rooms/5-networking.js) script demonstrates a
simple custom networking example. The script spawns a sphere at the center of
the room which changes color when a player moves close to it. The color of the
sphere is networked so all clients see the color change in sync.

A more detailed guide on how to add custom networked interactables to Hubs can
be found in a guide written by one of its contributors
[here.](https://github.com/mozilla/hubs/blob/a98d7a62516aa19f11e38f32d2d6683d09643a9a/doc/creating-networked-interactables.md)

## Interaction

Hubs' interaction system works differently from what you might be familiar with
in vanilla A-Frame. It's designed to work across a variety of inputs, so you
should use the existing systems where possible. This is an area of active
exploration and may require some poking around the
[Hubs source code](https://github.com/mozilla/hubs) to achieve your desired
effect.

To help get you started, we provide two interaction samples.
[`6-interaction-click.js`](./src/rooms/6-interaction-click.js) demonstrates how
to set up an object with the `SingleActionButtonSystem` so that it effectively
receives click events.
[`7-interaction-drag.js`](./src/rooms/7-interaction-drag.js) shows how to set up
an object with the `HoldableButtonSystem` to receive the rough equivalent of
pointer down and up events, which can be used for clicking and dragging on
things. Both examples include networking logic so interactions are shared across
clients.

## Publishing Scripts

Up to this point, your scripts have been hosted on a temporary development
server via a random subdomain like `e9ce45e858a7.ngrok.io`. In order to have
your script persist in a room for production you should host it on GitHub,
specifically in a repository on the
[AEL organization](https://github.com/aelatgt/). If you've been working on your
scripts in a personal repository, you can sync those with the organization
repository by creating a
[pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests).

### Enabling Static File Serving

By enabling GitHub Pages on your repository, GitHub can statically serve your
scripts at a public URL. You can find the option to enable GitHub Pages under
your repository settings:

![Highlighted settings box](https://i.imgur.com/w8UmMt1.png)

Enable GitHub Pages on the `main` branch and the root folder:

![Main branch and root folder selected](https://i.imgur.com/ECoB1oc.png)

Now your room scripts will be available at a permanent URL like:

https://www.aelatgt.org/hubs-scripting-guide/src/rooms/1-basic.js
