#!/usr/bin/env node

require('@jseeio/jsee').runPackage(__dirname, process.argv.slice(2)).catch(error => {
  console.error(error && error.message ? error.message : error)
  process.exit(1)
})
