## WordPress Site Manager

A Laravel application designed to provision, manage, and monitor Dockerized WordPress instances on remote servers via SSH. It utilizes a hybrid stack with Inertia.js and handles remote container orchestration using phpseclib.

## Table of Contents

- [Features](#features)
- [Requirement](#requirement)
- [Installation](#installation)
- [Remote Server Setup](#remote-server-setup)
- [Wordpress Site Management](#wordpress-site-management)
- [SSH & Docker Logic](#ssh-docker-logic)
- [Docker Compose Structure](#docker-compose-structure)
- [Monitoring System](#monitoring-system)
- [DB Info](#db-info)
- [Setup Monitoring](#setup-monitoring)
- [Queue Processing](#queue-processing)
- [Security Notes](#Security-notes)

## Features

Remote WordPress site deployment using Docker Compose

Real-time site status monitoring

CRUD operations for WordPress sites

Automated health checks via cron jobs

Queue-based background processing

## Requirement

System Requirements
Ubuntu 24.04 or WSL 2 (Windows Subsystem for Linux)

PHP 8.2+

Composer 2.7.6+

Node.js 18+ and npm

SSH Server on target deployment servers

## Laravel Packages

inertiajs/inertia-laravel - Frontend React integration

laravel/telescope - Debugging and development insights

phpseclib/phpseclib - SSH2 connectivity for remote operations

friendsofphp/php-cs-fixer - PHP code style fixing

## Installation

Clone and Setup

git clone git@github.com:Jubayer-Hossain-Abir-404/simple-wp-site-manager.git

cd wordpress-site-manager

Install PHP dependencies
composer install

Install Node.js dependencies
npm install

Environment setup
cp .env.example .env

php artisan key:generate

Update .env with database credentials
DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=wordpress_manager

DB_USERNAME=your_username

DB_PASSWORD=your_password

Run migrations
php artisan migrate

Run Seeder
php artisan db:seed

Additional
Can take the project MySQL Zip file. Can Unzip and use this file.

Development Build

Start Laravel development server
php artisan serve

Start Vite dev server (for frontend assets)
npm run dev

Frontend build
npm run build

## DB-Info

Status column enum info
'status' => [
    'stopped' => 1,
    'deploying' => 2,
    'running' => 3,
    'failed' => 4,
    'stopping' => 5,
],

## Remote-server-setup

SSH Server Installation

Ubuntu/Debian

sudo apt update
sudo apt install openssh-server
sudo systemctl enable ssh
sudo systemctl start ssh

Configure firewall

sudo ufw allow ssh
Docker Requirements

Need Docker & Docker Compose Setup

## wordpress-site-management

Factory Seeding
php artisan db:seed

CRUD Operations
Access WordPress sites management via:
http://localhost:8000/wordpress-sites

Stop Specific Container

POST /wordpress-sites/{wordpressSite}/stop

## SSH-docker-logic

Connection Process
The RemoteDockerService handles SSH connections using phpseclib:

SSH Authentication - Connects to remote server using stored credentials

Directory Creation - Creates isolated directory per domain

Docker Compose Setup - Generates and deploys docker-compose.yml

Container Management - Starts/stops WordPress and MariaDB containers

Instruction
SSH requires permission to run Docker

## Docker-compose-structure

Each site gets:

MariaDB 10.6 - Database with unique credentials

WordPress Latest - WordPress instance with volume persistence

Virtual Host - Domain-based routing setup

## Monitoring-system

Bash Monitor Script (Script can be found project root bash file)
The docker-monitor.sh script

Runs every 5 minutes via cron

Checks container health status

Sends webhook updates to project

Logs activities to /var/log/docker-monitor.log

## Setup-monitoring

Create monitor script

sudo nano /usr/local/bin/docker-monitor.sh
Paste the bash script content (from project bash file)

Make executable

sudo chmod +x /usr/local/bin/docker-monitor.sh

Setup cron job (run as root)

sudo crontab -e

Add: */5 * * * * /usr/local/bin/docker-monitor.sh

## Queue-processing
Run queue worker for background jobs

## DB run background prcessing
php artisan queue:work

Job Types
Site deployment operations

Stop container

Delete container

## Security-notes

Store SSH credentials securely using Laravel encryption

