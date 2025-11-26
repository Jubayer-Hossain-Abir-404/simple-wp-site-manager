<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Str;
use phpseclib3\Net\SSH2;

class RemoteDockerService
{
    protected function connect(array $wordpressSite)
    {
        $serverIp = $wordpressSite['server_ip'] ?? '127.0.0.1';
        $sshPort = $wordpressSite['ssh_port'] ?? 22;
        $sshUser = $wordpressSite['ssh_user'] ?? 'root';
        $ssh = new SSH2($serverIp, $sshPort);

        if (!$ssh->login($sshUser, $wordpressSite['ssh_password'] ?? '')) {
            throw new \Exception('SSH auth failed');
        }

        return $ssh;
    }

    protected function dockerComposeYml(array $wordpressSite)
    {
        $dbName = 'wp_' . Str::random(8);
        $dbUser = 'wpuser';
        $dbPass = Str::random(16);
        $domain = $wordpressSite['domain'];

        return <<<YML
version: '3.8'
services:
  db:
    image: mariadb:10.6
    environment:
      MYSQL_ROOT_PASSWORD: "{$dbPass}"
      MYSQL_DATABASE: "{$dbName}"
      MYSQL_USER: "{$dbUser}"
      MYSQL_PASSWORD: "{$dbPass}"
    volumes:
      - db_data:/var/lib/mysql

  wordpress:
    image: wordpress:latest
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: "{$dbUser}"
      WORDPRESS_DB_PASSWORD: "{$dbPass}"
      WORDPRESS_DB_NAME: "{$dbName}"
      VIRTUAL_HOST: "{$domain}"
      WORDPRESS_TABLE_PREFIX: "wp_"
    volumes:
      - wp_data:/var/www/html
    restart: always

volumes:
  db_data:
  wp_data:
YML;
    }

    public function deploy(array $wordpressSite)
    {
        try {
            $ssh = $this->connect($wordpressSite);
            $dir = $wordpressSite['domain'];
            // make dir
            $ssh->exec("mkdir -p {$dir}");

            // write docker-compose.yml
            $compose = $this->dockerComposeYml($wordpressSite);

            // doc to write
            $ssh->exec("cat > {$dir}/docker-compose.yml <<'YAML'\n{$compose}\nYAML");

            // start compose
            $out = $ssh->exec("cd {$dir} && docker compose up -d 2>&1");

            // check for errors
            if (str_contains(strtolower($out), 'error')) {
                throw new \Exception('Docker compose failed: ' . $out);
            }

            return $out;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function stop(array $wordpressSite)
    {
        try {
            $ssh = $this->connect($wordpressSite);
            $dir = $wordpressSite['domain'];

            // stop compose
            $out = $ssh->exec("cd {$dir} && docker compose down 2>&1");

            // check for errors
            if (str_contains(strtolower($out), 'error')) {
                throw new \Exception('Docker compose stop failed: ' . $out);
            }

            return $out;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function remove(array $wordpressSite)
    {
        try {
            $ssh = $this->connect($wordpressSite);
            $dir = $wordpressSite['domain'];

            // stop and remove
            $out = $ssh->exec("cd {$dir} && docker compose down --volumes --remove-orphans 2>&1");

            // remove dir
            $ssh->exec("rm -rf {$dir}");

            // check for errors
            if (str_contains(strtolower($out), 'error')) {
                throw new \Exception('Docker compose removal failed: ' . $out);
            }

            return $out;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
