#!/usr/bin/env node

var program = require('commander');
var up = require('./app/up');

program.version('0.1.0')

program
  .command('up <setup>')
  .description('Installs all the programs and plugins in <setup> file')
  .action(setup => up(setup));

program.command('new-setup', 'Creates a empty setup file')

program.on('--help', function() {
  console.log(
`                     . .. .                      
                 ::/oysssssyyo/::                 
             -+/+sho:.   hy .:+ys+/+-             
           /os/yy+s+    .h/     -syoys/           
         +ooo+d/ -hs ...oo-..     :d+soo+         
       /oyhy:d/  -/o/s+o//+ss//:.  :d/yyys:       
      +os++/sy.::oh+/+o+ss+/odshs/- sy/+oys+      
     +//s+:+hsyoydd/+++ymmy+/yossyyyod+:+s//+     
      :shd//sy:oss+sh++ssso+sysho-  sy/+sds:      
       -oshy/d:oh-:ysso/o++oo::.   -d/sos+-       
         /sys+ho    +/:.../so+-.  -h+oss/         
           /+o/y/:oy:/s.    .+o+++yoys:           
             .:+//so. sy     ./s+/++.             
                 --/osooo++oso/--                 
                      .    .

                RESTARTER JS 👁 v${program.version()}
`
  );
})

program.parse(process.argv);