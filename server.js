const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// 导入路由
const authRoutes = require('./routes/auth');
const achievementRoutes = require('./routes/achievement');
const collegeRoutes = require('./routes/college');
const teamRoutes = require('./routes/team');
const courseRoutes = require('./routes/course');
const competitionRoutes = require('./routes/competition');
const researchRoutes = require('./routes/research');
const paperRoutes = require('./routes/paper');
const intellectualRoutes = require('./routes/intellectual');
const teachingAwardRoutes = require('./routes/teachingAward');
const cooperationRoutes = require('./routes/cooperation');
const internationalRoutes = require('./routes/international');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

// 创建上传目录
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(uploadDir));

// API路由
app.use('/api/auth', authRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/colleges', collegeRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/intellectual', intellectualRoutes);
app.use('/api/teaching-awards', teachingAwardRoutes);
app.use('/api/cooperation', cooperationRoutes);
app.use('/api/international', internationalRoutes);
app.use('/api/stats', statsRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: '教学成果管理平台API运行中' });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`教学成果管理平台后端服务运行在端口 ${PORT}`);
});
