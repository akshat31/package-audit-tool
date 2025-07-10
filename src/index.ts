#!/usr/bin/env node

import { runAudit } from './audit'
import chalk from 'chalk'

console.log(chalk.blueBright(`🔍 Starting NPM Package Audit...\n`))

runAudit()
