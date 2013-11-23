Dispatcher
====
API Interface in node.js and express. 

Local Environment Setup
====
1. Create the following working directories
    - git clone git@github.com:jkyau/jkyau.git /cartgirl/master
    - git clone git@github.com:[username]/dash.git /cartgirl/local
2. Install Node.js
    - git clone https://github.com/joyent/node.git
    - cd node
    - ./configure
    - make
    - sudo make install
3. Install NPM
    - curl http://npmjs.org/install.sh | sh
4. Install Supervisor
    - npm install -g supervisor
5. Install Redis
    - port install redis
    - redis-server /opt/local/etc/redis.conf 
6. Download and Install MongoDB
    - http://www.mongodb.org/downloads
    - Move the mongoDB directory to a dev directory (say ~/dev/mongodb) and note down the path to it
    - MongoDB looks for a /data/db directory to write data to. Create this directory (cd ~/dev/mongodb; mkdir data; cd data; mkdir db;)
    - Explicitly set the dbpath to the new data path you just created (cd ~/dev/mongodb; ./bin/mongod --dbpath ./data/db)
7. Create public key and send it to jason@samsungaccelerator.com
    - ssh-keygen -t rsa -C "[username]@samsungaccelerator.com"
    - Key is located here: ~/.ssh/id_rsa.pub
    - Ask John to ssh into secure-node-api instance and add your public key to ~/.ssh/authorized_keys
        - pem is located in /api/dispatcher/dash.pem
        - ssh -i dash.pem ubuntu@54.235.66.238
8. Create remote to run deploy script which will push to production
    - cd /accelerator/dash-master/api/dispatcher
    - git remote add ec2-api ssh://ubuntu@54.235.66.238/home/ubuntu/repo

Start Node
====
1. cd /accelerator/dash-local/api/dispatcher
2. supervisor server.js

Push to production
====
1. git pull upstream master
2. Commit in your [forked ] branch of dash and push to your branch
    - [/accelerator/dash-local/] commit -am"some changes"
    - [/accelerator/dash-local/] git push
3. Create a pull request and merge changes into master
    - https://github.com/[username]/dash
4. Run the deploy script on the master working directory
    - cd /accelerator/dash-master/api/dispatcher/scripts; 
    - ./deploy.sh;

Useful links
====
- https://console.aws.amazon.com/ec2/home?region=us-east-1#s=Instances
- https://console.aws.amazon.com/route53/home?#
- Ask Jason for the username and password
