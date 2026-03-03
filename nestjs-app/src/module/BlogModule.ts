import {
    Module,
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Param,
    Query,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiProperty, ApiQuery, ApiResponse} from '@nestjs/swagger';

// --- DTOs ---

class CreatePostDto {
    @ApiProperty({description: '文章标题', example: 'NestJS 快速集成指南'})
    title: string;

    @ApiProperty({description: '内容', example: '正文内容...'})
    content: string;

    @ApiProperty({description: '分类', example: '技术'})
    category: string;

    @ApiProperty({description: '标签', example: ['NestJS'], isArray: true})
    tags: string[];
}

class PostResponseDto extends CreatePostDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    createdAt: Date;
}

// --- Service ---

@Injectable()
export class BlogService {
    private posts: PostResponseDto[] = [
        {
            id: '1',
            title: '欢迎使用内嵌博客模块',
            content: '这是一个开箱即用的技术博客组件，支持 API 和 UI 界面。现在你直接访问根目录 / 即可管理。',
            category: '公告',
            tags: ['系统'],
            createdAt: new Date(),
        },
    ];

    findAll(category?: string) {
        return category ? this.posts.filter((p) => p.category === category) : this.posts;
    }

    findOne(id: string) {
        const post = this.posts.find((p) => p.id === id);
        if (!post) throw new NotFoundException('文章不存在');
        return post;
    }

    create(dto: CreatePostDto) {
        const newPost = {id: Math.random().toString(36).substr(2, 9), ...dto, createdAt: new Date()};
        this.posts.unshift(newPost);
        return newPost;
    }

    delete(id: string) {
        const index = this.posts.findIndex((p) => p.id === id);
        if (index === -1) throw new NotFoundException();
        this.posts.splice(index, 1);
        return {success: true};
    }
}

// --- API Controller ---

@ApiTags('博客 API')
@Controller('api/blog')
export class BlogApiController {
    constructor(private readonly blogService: BlogService) {
    }

    @Get()
    getAll(@Query('category') category?: string) {
        return this.blogService.findAll(category);
    }

    @Post()
    create(@Body() dto: CreatePostDto) {
        return this.blogService.create(dto);
    }
}

// --- View Controller (页面控制器) ---

@ApiTags('博客页面')
@Controller() // 将控制器设为根路径
export class BlogViewController {
    @Get() // 匹配 GET /
    @ApiOperation({summary: '访问博客管理界面 (根路径)'})
    getBlogPage() {
        return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Blog Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-slate-50 text-slate-900">
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect } = React;
        function App() {
            const [posts, setPosts] = useState([]);
            const [showModal, setShowModal] = useState(false);
            const [form, setForm] = useState({ title: '', content: '', category: '默认', tags: '' });

            const load = () => fetch('/api/blog').then(res => res.json()).then(setPosts);
            useEffect(() => { load(); }, []);

            const submit = async (e) => {
                e.preventDefault();
                await fetch('/api/blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()) })
                });
                setShowModal(false);
                setForm({ title: '', content: '', category: '默认', tags: '' });
                load();
            };

            return (
                <div className="max-w-4xl mx-auto p-6">
                    <div className="flex justify-between items-center mb-10 mt-4">
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                             <i className="fas fa-terminal text-blue-600"></i> DevBlog
                        </h1>
                        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 font-semibold">
                            写文章
                        </button>
                    </div>

                    <div className="space-y-6">
                        {posts.length === 0 && (
                            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                                <i className="fas fa-inbox text-4xl mb-4 block"></i>
                                暂无文章，点击右上角发布
                            </div>
                        )}
                        {posts.map(p => (
                            <article key={p.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{p.category}</span>
                                    <span className="text-xs text-slate-400 font-mono">{new Date(p.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 text-slate-800">{p.title}</h2>
                                <p className="text-slate-600 mb-6 text-md leading-relaxed line-clamp-3">{p.content}</p>
                                <div className="flex gap-2">
                                    {p.tags.map(t => <span key={t} className="text-[10px] uppercase font-bold text-slate-400 border border-slate-100 px-2 py-0.5 rounded-md">#{t}</span>)}
                                </div>
                            </article>
                        ))}
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
                            <form onSubmit={submit} className="bg-white p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-black text-slate-800">创作文章</h2>
                                    <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><i className="fas fa-times"></i></button>
                                </div>
                                <div className="space-y-4">
                                    <input placeholder="文章标题" className="w-full bg-slate-50 border-transparent border p-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" onChange={e => setForm({...form, title: e.target.value})} required />
                                    <div className="flex gap-3">
                                        <input placeholder="分类" className="w-1/2 bg-slate-50 border-transparent border p-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" onChange={e => setForm({...form, category: e.target.value})} />
                                        <input placeholder="标签(逗号隔开)" className="w-1/2 bg-slate-50 border-transparent border p-4 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" onChange={e => setForm({...form, tags: e.target.value})} />
                                    </div>
                                    <textarea placeholder="使用 Markdown 记录你的思考..." className="w-full bg-slate-50 border-transparent border p-4 rounded-2xl h-48 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none" onChange={e => setForm({...form, content: e.target.value})} required></textarea>
                                </div>
                                <div className="mt-8 flex gap-3">
                                    <button type="submit" className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]">立即发布</button>
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-4 border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-50 font-semibold transition-all">取消</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            );
        }
        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>
    `;
    }
}

// --- Module ---

@Module({
    controllers: [BlogApiController, BlogViewController],
    providers: [BlogService],
    exports: [BlogService],
})
export class BlogModule {
}