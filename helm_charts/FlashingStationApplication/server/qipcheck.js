const dns = require('dns');
const dnsPromises = dns.promises;
const fs = require('fs');

async function main() {
      console.log("Checking QIP registration for file: ")
          try {

            var host = await dnsPromises.reverse(element[1]);
            console.log(host)
            if (host == element[3]) {
              console.log("INFO: " + element[1] + " is correctly registered in QIP correctly as " + host)
            } else {
              console.log("ERROR: " + element[1] + " is incorrectly registered in QIP correctly as " + host)
            }
          } catch (error) {
            if (error.code == 'ENOTFOUND') {
              console.log("ERROR: " + error.hostname + " is incorrectly registered in QIP")
            }
          }

        }
        

main();