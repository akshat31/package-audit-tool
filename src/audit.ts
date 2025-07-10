import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import Table from 'cli-table3'
import { execSync } from 'child_process'

export async function runAudit() {
  const pkgPath = path.join(process.cwd(), 'package.json')
  if (!fs.existsSync(pkgPath)) {
    console.log(chalk.red('❌ No package.json found in this directory.'))
    return
  }

  const packageJSON = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  const deps = Object.assign({}, packageJSON.dependencies, packageJSON.devDependencies)

  const table = new Table({
    head: ['Package', 'Current', 'Latest', 'Status'],
    colWidths: [25, 15, 15, 20]
  })

  for (const [pkg, currentVersion] of Object.entries(deps)) {
    try {
      const latest = execSync(`npm show ${pkg} version`).toString().trim()
      const isOutdated = currentVersion.replace(/[^0-9.]/g, '') !== latest
      const status = isOutdated ? chalk.yellow('Update Available') : chalk.green('Up-to-date')

      table.push([pkg, currentVersion, latest, status])
    } catch (err) {
      table.push([pkg, currentVersion, 'N/A', chalk.red('Fetch failed')])
    }
  }

  console.log(table.toString())
}
