module.exports = {
  apps: [{
    name: 'asiaze-news',
    script: './server.js',
    cwd: '/var/www/news-main',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/news-main/logs/pm2-error.log',
    out_file: '/var/www/news-main/logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};
