import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/foundation.dart';
import 'package:video_player/video_player.dart';
// For web platform only
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:ui' as ui;
import 'services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'category_preferences_screen.dart';

void main() {
  runApp(const AsiazeApp());
}

class AsiazeApp extends StatelessWidget {
  const AsiazeApp({super.key});

  static const Color primaryRed = Color(0xFFDC143C); // Crimson per spec

  @override
  Widget build(BuildContext context) {
    final theme = ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: primaryRed),
      useMaterial3: true,
      fontFamily: null,
      inputDecorationTheme: const InputDecorationTheme(
        border: OutlineInputBorder(),
      ),
    );
    return MaterialApp(
      title: 'asiaze',
      debugShowCheckedModeBanner: false,
      theme: theme.copyWith(
        appBarTheme: const AppBarTheme(centerTitle: true),
      ),
      home: const SplashScreen(),
      routes: {
        OnboardingScreen.routeName: (_) => const OnboardingScreen(),
        LoginScreen.routeName: (_) => const LoginScreen(),
        VerifyScreen.routeName: (_) => const VerifyScreen(),
        SignUpScreen.routeName: (_) => const SignUpScreen(),
        PreferencesScreen.routeName: (_) => const PreferencesScreen(),
        MainNav.routeName: (_) => const MainNav(),
      },
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _route();
  }

  void _route() async {
    await Future.delayed(const Duration(seconds: 2));
    final prefs = await SharedPreferences.getInstance();
    final seenOnboarding = prefs.getBool('seenOnboarding') ?? false;
    final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
    
    if (!mounted) return;
    
    if (isLoggedIn) {
      Navigator.of(context).pushReplacementNamed(MainNav.routeName);
    } else if (seenOnboarding) {
      Navigator.of(context).pushReplacementNamed(LoginScreen.routeName);
    } else {
      Navigator.of(context).pushReplacementNamed(OnboardingScreen.routeName);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AsiazeApp.primaryRed,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Text(
              'asiaze',
              style: TextStyle(
                color: Colors.white,
                fontSize: 40,
                fontWeight: FontWeight.w800,
                letterSpacing: 1.0,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Your World, Simplified',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- Onboarding ----------------
class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});
  static const String routeName = '/onboarding';

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _controller = PageController();
  int _index = 0;

  final _pages = const [
    _OnboardModel(
      title: 'Stay Updated in Seconds',
      subtitle: 'Read short 60-word news summaries instantly',
      assetName: 'refranceimages/Group (16).png',
      fallbackUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop',
    ),
    _OnboardModel(
      title: 'News in English, Hindi & Bengali',
      subtitle: 'Read short 60-word news summaries instantly',
      assetName: 'refranceimages/8033abcf5b97cb3ea004c5f5403f403561b33094.png',
      fallbackUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&auto=format&fit=crop',
    ),
    _OnboardModel(
      title: 'Watch Short News Reels Instantly',
      subtitle: 'Scroll through quick video updates anytime',
      assetName: 'refranceimages/749bdeef4bdd026b9e097927f39b724af759225c.png',
      fallbackUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec1f9ff?q=80&w=800&auto=format&fit=crop',
    ),
  ];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _next() async {
    if (_index < _pages.length - 1) {
      _controller.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    } else {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setBool('seenOnboarding', true);
      if (!mounted) return;
      Navigator.of(context).pushReplacementNamed(LoginScreen.routeName);
    }
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _controller,
                itemCount: _pages.length,
                onPageChanged: (i) => setState(() => _index = i),
                itemBuilder: (_, i) {
                  final p = _pages[i];
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(120),
                          child: Image.network(
                            p.fallbackUrl,
                            height: 220,
                            width: 220,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stack) {
                              return Container(
                                height: 220,
                                width: 220,
                                color: Colors.grey[300],
                                child: Icon(Icons.image, size: 80, color: Colors.grey[600]),
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 32),
                        Text(
                          p.title,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w700,
                            height: 1.3,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          p.subtitle,
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Color(0xFF9E9E9E),
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(
                            _pages.length,
                            (d) {
                              final isActive = d == _index;
                              return Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 6.0),
                                child: AnimatedContainer(
                                  duration: const Duration(milliseconds: 200),
                                  width: isActive ? 10 : 6,
                                  height: isActive ? 10 : 6,
                                  decoration: BoxDecoration(
                                    color: isActive ? red : Colors.grey.shade400,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
              child: SizedBox(
                height: 56,
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: red,
                    foregroundColor: Colors.white,
                    minimumSize: const Size.fromHeight(56),
                    textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(28),
                    ),
                  ),
                  onPressed: _next,
                  child: Text(_index == _pages.length - 1 ? 'Get Started' : 'Next'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OnboardModel {
  final String title;
  final String subtitle;
  final String assetName;
  final String fallbackUrl;
  const _OnboardModel({
    required this.title,
    required this.subtitle,
    required this.assetName,
    required this.fallbackUrl,
  });
}

// ---------------- Login ----------------
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  static const String routeName = '/login';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _obscure = true;
  bool _loading = false;

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 24),
                    Text(
                      'asiaze',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: red,
                        fontSize: 32,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 24),
                    TextField(
                      controller: _emailCtrl,
                      decoration: InputDecoration(
                        hintText: 'Email or Phone',
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _passCtrl,
                      obscureText: _obscure,
                      decoration: InputDecoration(
                        hintText: 'Password',
                        filled: true,
                        fillColor: Colors.white,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                        suffixIcon: IconButton(
                          icon: Icon(_obscure ? Icons.visibility : Icons.visibility_off),
                          onPressed: () => setState(() => _obscure = !_obscure),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: red,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                        ),
                        onPressed: _loading ? null : () async {
                          if (_emailCtrl.text.isEmpty || _passCtrl.text.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Please fill all fields')),
                            );
                            return;
                          }

                          setState(() => _loading = true);

                          try {
                            print('🔐 Attempting login with email: ${_emailCtrl.text}');
                            final loginData = await ApiService.login(
                              _emailCtrl.text,
                              _passCtrl.text,
                            );
                            print('✅ Login successful: $loginData');
                            
                            final prefs = await SharedPreferences.getInstance();
                            await prefs.setBool('isLoggedIn', true);
                            
                            // Save user data
                            final user = loginData['user'];
                            print('Login response user data: $user');
                            
                            // Try both 'id' and '_id' fields
                            final userId = user['_id']?.toString() ?? user['id']?.toString() ?? '';
                            await prefs.setString('userId', userId);
                            await prefs.setString('userName', user['name'].toString());
                            await prefs.setString('userEmail', user['email'].toString());
                            
                            print('Saved userId: $userId');
                            
                            if (!mounted) return;
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Login successful!')),
                            );
                            
                            // Check if preferences already set
                            final language = prefs.getString('language');
                            final interests = prefs.getStringList('interests');
                            final hasPreferences = language != null && interests != null && interests.isNotEmpty;
                            
                            if (hasPreferences) {
                              Navigator.of(context).pushReplacementNamed(MainNav.routeName);
                            } else {
                              Navigator.of(context).pushReplacementNamed(PreferencesScreen.routeName);
                            }
                          } catch (e) {
                            if (!mounted) return;
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
                            );
                          } finally {
                            if (mounted) setState(() => _loading = false);
                          }
                        },
                        child: Text(_loading ? 'Logging in...' : 'Login'),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: const [
                        Expanded(child: Divider()),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8.0),
                          child: Text('Or continue with'),
                        ),
                        Expanded(child: Divider()),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      height: 48,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                        ),
                        onPressed: () {},
                        child: const Text('Google'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 24.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Don't have an account? "),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).pushReplacementNamed(SignUpScreen.routeName);
                    },
                    child: Text(
                      'Sign Up',
                      style: TextStyle(color: red, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- Verify ----------------
class VerifyScreen extends StatefulWidget {
  const VerifyScreen({super.key});
  static const String routeName = '/verify';

  @override
  State<VerifyScreen> createState() => _VerifyScreenState();
}

class _VerifyScreenState extends State<VerifyScreen> {
  final _nodes = List.generate(6, (_) => FocusNode());
  final _controllers = List.generate(6, (_) => TextEditingController());

  @override
  void dispose() {
    for (final n in _nodes) {
      n.dispose();
    }
    for (final c in _controllers) {
      c.dispose();
    }
    super.dispose();
  }

  String get _code => _controllers.map((c) => c.text).join();

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 520),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    'Verify your account',
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Enter the 6-digit code sent to your email/phone',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: List.generate(6, (i) {
                      return SizedBox(
                        width: 44,
                        child: TextField(
                          controller: _controllers[i],
                          focusNode: _nodes[i],
                          textAlign: TextAlign.center,
                          keyboardType: TextInputType.number,
                          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                          maxLength: 1,
                          decoration: InputDecoration(
                            counterText: '',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          onChanged: (v) {
                            if (v.isNotEmpty && i < 5) {
                              _nodes[i + 1].requestFocus();
                            }
                          },
                        ),
                      );
                    }),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    height: 48,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: red,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                      ),
                      onPressed: () async {
                        final code = _code;
                        if (code == '123456') {
                          final prefs = await SharedPreferences.getInstance();
                          await prefs.setBool('isLoggedIn', true);
                          if (!mounted) return;
                          
                          // Check if preferences already set
                          final language = prefs.getString('language');
                          final interests = prefs.getStringList('interests');
                          final hasPreferences = language != null && interests != null && interests.isNotEmpty;
                          
                          if (hasPreferences) {
                            Navigator.of(context).pushReplacementNamed(MainNav.routeName);
                          } else {
                            Navigator.of(context).pushReplacementNamed(PreferencesScreen.routeName);
                          }
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Invalid OTP! Use 123456')),
                          );
                        }
                      },
                      child: const Text('Verify'),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    "Didn't receive code? Resend",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ---------------- Sign Up ----------------
class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});
  static const String routeName = '/signup';

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _nameCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  bool _obscure = true;
  bool _loading = false;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _emailCtrl.dispose();
    _passCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 24),
                    Text(
                      'asiaze',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: red,
                        fontSize: 32,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 24),
                    const SizedBox(height: 8),
                    const Text('Full Name'),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _nameCtrl,
                      decoration: const InputDecoration(
                        hintText: 'Full Name',
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text('Email or Phone'),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _emailCtrl,
                      decoration: const InputDecoration(
                        hintText: 'Email or Phone',
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text('Password'),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _passCtrl,
                      obscureText: _obscure,
                      decoration: InputDecoration(
                        hintText: 'Password',
                        suffixIcon: IconButton(
                          icon: Icon(_obscure ? Icons.visibility : Icons.visibility_off),
                          onPressed: () => setState(() => _obscure = !_obscure),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      height: 48,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: red,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                        ),
                        onPressed: _loading ? null : () async {
                          if (_nameCtrl.text.isEmpty || _emailCtrl.text.isEmpty || _passCtrl.text.isEmpty) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Please fill all fields')),
                            );
                            return;
                          }

                          setState(() => _loading = true);

                          try {
                            await ApiService.signUp(
                              _nameCtrl.text,
                              _emailCtrl.text,
                              _passCtrl.text,
                            );
                            
                            if (!mounted) return;
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('Sign up successful! Verify OTP')),
                            );
                            Navigator.of(context).pushNamed(VerifyScreen.routeName);
                          } catch (e) {
                            if (!mounted) return;
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
                            );
                          } finally {
                            if (mounted) setState(() => _loading = false);
                          }
                        },
                        child: Text(_loading ? 'Signing Up...' : 'Sign Up'),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: const [
                        Expanded(child: Divider()),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8.0),
                          child: Text('Or continue with'),
                        ),
                        Expanded(child: Divider()),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      height: 48,
                      child: OutlinedButton(
                        style: OutlinedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(24),
                          ),
                        ),
                        onPressed: () {},
                        child: const Text('Google'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 24.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Already have an account? '),
                  GestureDetector(
                    onTap: () {
                      Navigator.of(context).pushReplacementNamed(LoginScreen.routeName);
                    },
                    child: Text(
                      'Login',
                      style: TextStyle(color: red, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------- Main Nav and app content ----------------
class MainNav extends StatefulWidget {
  const MainNav({super.key});
  static const String routeName = '/main';

  @override
  State<MainNav> createState() => _MainNavState();
}

class _MainNavState extends State<MainNav> {
  int _index = 1; // default to Home

  final _pages = const [
    SearchScreen(),
    HomeScreen(),
    ProfileScreen(),
    VideosScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      body: _pages[_index],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: Colors.white,
        elevation: 8,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        currentIndex: _index,
        onTap: (i) => setState(() => _index = i),
        selectedItemColor: red,
        unselectedItemColor: Colors.black87,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.search), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.videocam), label: ''),
        ],
      ),
    );
  }
}

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _query = TextEditingController();
  List<dynamic> _allPosts = [];
  List<dynamic> _results = [];
  List<String> _categories = ['My State'];
  bool _loading = true;
  String _selectedCategory = 'My State';

  void _applyFilters() {
    final q = _query.text.toLowerCase();
    setState(() {
      _results = _allPosts.where((p) {
        final title = (p['title'] ?? '').toString().toLowerCase();
        final content = (p['summary'] ?? p['content'] ?? '').toString().toLowerCase();
        final matchesQuery = q.isEmpty || title.contains(q) || content.contains(q);
        
        if (_selectedCategory == 'My State') return matchesQuery;
        
        final catName = p['category']?['name']?.toString() ?? '';
        return matchesQuery && catName == _selectedCategory;
      }).toList();
    });
  }

  @override
  void initState() {
    super.initState();
    _fetchData();
    _query.addListener(_applyFilters);
  }

  Future<void> _fetchData() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final interests = prefs.getStringList('interests') ?? [];
      final news = await ApiService.getNews();
      
      setState(() {
        _allPosts = news;
        _results = news;
        _categories = ['My State', ...interests];
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  void dispose() {
    _query.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back),
                    onPressed: () => Navigator.of(context).maybePop(),
                  ),
                  Expanded(
                    child: Container(
                      height: 44,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.08),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                        border: Border.all(color: Colors.grey.shade300),
                      ),
                      alignment: Alignment.centerLeft,
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      child: TextField(
                        controller: _query,
                        decoration: const InputDecoration(
                          hintText: 'Search news...',
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.notifications_none),
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (_) => Scaffold(
                            backgroundColor: Colors.white,
                            appBar: AppBar(
                              leading: IconButton(
                                icon: const Icon(Icons.arrow_back),
                                onPressed: () => Navigator.of(context).maybePop(),
                              ),
                              title: const Text('Notifications'),
                              centerTitle: true,
                              backgroundColor: Colors.white,
                              foregroundColor: Colors.black,
                              elevation: 0.5,
                            ),
                            body: ListView.separated(
                              padding: const EdgeInsets.all(16),
                              itemCount: 4,
                              separatorBuilder: (_, __) => const SizedBox(height: 12),
                              itemBuilder: (context, i) {
                                final titles = [
                                  'Breaking: Major policy update',
                                  'New Sports Story available',
                                  'Entertainment news: Celebrity interview',
                                  'Finance update: Market trends',
                                ];
                                final times = ['5m ago', '1h ago', '2h ago', '3h ago'];
                                final highlight = i == 0;
                                return Card(
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  elevation: 0.5,
                                  child: ListTile(
                                    leading: Icon(Icons.notifications, color: highlight ? AsiazeApp.primaryRed : Colors.black87),
                                    title: Text(titles[i], style: const TextStyle(fontWeight: FontWeight.w700)),
                                    subtitle: Text(times[i]),
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 40,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: _categories.map((c) {
                    final selected = _selectedCategory == c;
                    return Padding(
                      padding: const EdgeInsets.only(right: 12),
                      child: ChoiceChip(
                        label: Text(c),
                        selected: selected,
                        onSelected: (_) {
                          setState(() => _selectedCategory = c);
                          _applyFilters();
                        },
                        selectedColor: red,
                        labelStyle: TextStyle(color: selected ? Colors.white : Colors.black),
                      ),
                    );
                  }).toList(),
                ),
              ),
            ),
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator())
                  : _results.isNotEmpty
                      ? ListView.builder(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          itemCount: _results.length,
                          itemBuilder: (context, i) {
                            final p = _results[i];
                            final image = p['image'] ?? 'asset:refranceimages/Group (16).png';
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 16.0),
                              child: Card(
                                elevation: 2,
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                                clipBehavior: Clip.antiAlias,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    image.startsWith('asset:')
                                        ? Image.asset(image.replaceFirst('asset:', ''), height: 180, width: double.infinity, fit: BoxFit.cover)
                                        : Image.network(image, height: 180, width: double.infinity, fit: BoxFit.cover),
                                    Container(height: 2, width: 50, color: red, margin: const EdgeInsets.only(left: 16, top: 8)),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Text(p['title'] ?? '', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                                          const SizedBox(height: 6),
                                          Text(p['summary'] ?? p['content'] ?? '', style: TextStyle(color: Colors.grey.shade700), maxLines: 2, overflow: TextOverflow.ellipsis),
                                          const SizedBox(height: 8),
                                          Text('ASIAZE • Recently', style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        )
                      : Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.search_off, size: 64, color: Colors.grey.shade400),
                            const SizedBox(height: 16),
                            Text('No results found', style: TextStyle(color: Colors.black54)),
                          ],
                        ),
            ),
          ],
        ),
      ),
    );
  }
}

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String _userName = '';
  String _userEmail = '';
  String _initials = '';

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _userName = prefs.getString('userName') ?? 'User';
      _userEmail = prefs.getString('userEmail') ?? 'user@example.com';
      _initials = _getInitials(_userName);
    });
  }

  String _getInitials(String name) {
    final parts = name.trim().split(' ');
    if (parts.isEmpty) return 'U';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return '${parts[0][0]}${parts[parts.length - 1][0]}'.toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).maybePop(),
        ),
        title: const Text('Profile'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0.5,
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 16),
        children: [
          const SizedBox(height: 8),
          CircleAvatar(
            radius: 44,
            backgroundColor: Colors.grey.shade300,
            child: Text(_initials, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
          ),
          const SizedBox(height: 12),
          Center(child: Text(_userName, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700))),
          const SizedBox(height: 4),
          Center(child: Text(_userEmail, style: const TextStyle(color: Colors.black54))),
          const SizedBox(height: 16),
          const Divider(),
          ListTile(
            leading: Icon(Icons.card_giftcard, color: red),
            title: const Text('Reward'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => const RewardScreen()));
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: Icon(Icons.bookmark, color: red),
            title: const Text('Saved Articles'),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => const SavedArticlesScreen()));
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: Icon(Icons.settings, color: red),
            title: const Text('Settings'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) => const SettingsScreen()));
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: Icon(Icons.location_on, color: red),
            title: const Text('Your State :  West Bengal'),
          ),
          const Divider(),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: SizedBox(
              height: 48,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: red,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                ),
                onPressed: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setBool('isLoggedIn', false);
                  await prefs.remove('userId');
                  await prefs.remove('userName');
                  await prefs.remove('userEmail');
                  if (!context.mounted) return;
                  Navigator.of(context).pushNamedAndRemoveUntil(LoginScreen.routeName, (route) => false);
                },
                child: const Text('Logout'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class VideosScreen extends StatefulWidget {
  const VideosScreen({super.key});

  @override
  State<VideosScreen> createState() => _VideosScreenState();
}

class _WebVideoValue {
  final bool isInitialized;
  final Duration position;
  final Duration duration;
  const _WebVideoValue({required this.isInitialized, required this.position, required this.duration});
  _WebVideoValue copyWith({bool? isInitialized, Duration? position, Duration? duration}) =>
      _WebVideoValue(isInitialized: isInitialized ?? this.isInitialized, position: position ?? this.position, duration: duration ?? this.duration);
}

class _WebVideoController {
  final String url;
  final String viewType;
  // VideoElement removed for APK build
  final ValueNotifier<_WebVideoValue> notifier =
      ValueNotifier(const _WebVideoValue(isInitialized: false, position: Duration.zero, duration: Duration.zero));

  _WebVideoController(this.url)
      : viewType = 'web-video-' '${DateTime.now().microsecondsSinceEpoch}' '-${url.hashCode}';

  Future<void> initialize({bool muted = true, bool loop = true}) async {
    // Video initialization simplified for APK build
    notifier.value = notifier.value.copyWith(isInitialized: true, duration: Duration(milliseconds: 5000));
  }

  void play() {}
  void pause() {}
  void setMuted(bool muted) {}
  void setLooping(bool loop) {}
  void dispose() {
    // Simplified for APK build
  }
}

class _VideoModel {
  final String url;
  final String image;
  final String title;
  final String source;
  final String timeAgo;
  const _VideoModel({required this.url, required this.image, required this.title, required this.source, required this.timeAgo});
}

class _VideosScreenState extends State<VideosScreen> {
  bool _muted = true;
  final PageController _pageController = PageController();
  List<_VideoModel> _items = [];
  final List<VideoPlayerController> _controllers = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchReels();
  }

  Future<void> _fetchReels() async {
    try {
      print('🎬 Fetching reels from API...');
      final prefs = await SharedPreferences.getInstance();
      final categoryIds = prefs.getStringList('categoryIds') ?? [];
      
      List<dynamic> reels;
      if (categoryIds.isEmpty) {
        print('📡 Fetching all reels (no category filter)');
        reels = await ApiService.getReels();
      } else {
        print('📡 Fetching reels for categories: $categoryIds');
        reels = [];
        for (final id in categoryIds) {
          final categoryReels = await ApiService.getReels(categoryId: id);
          reels.addAll(categoryReels);
        }
      }
      print('✅ Fetched ${reels.length} reels from API');
      if (reels.isNotEmpty) {
        print('📹 First reel: ${reels[0]['title']} - ${reels[0]['videoUrl']}');
      }

      if (reels.isEmpty) {
        setState(() {
          _items = [];
          _loading = false;
        });
      } else {
        setState(() {
          _items = reels.map((r) {
            String videoUrl = r['videoUrl'] ?? '';
            // Convert relative URL to absolute URL
            if (videoUrl.startsWith('/uploads/')) {
              videoUrl = '${ApiService.baseServerUrl}$videoUrl';
            }
            print('📹 Video URL: $videoUrl');
            return _VideoModel(
              url: videoUrl,
              image: r['thumbnail'] ?? 'refranceimages/c049d488ea53162e319b73ae144cac43efe0c895.png',
              title: r['title'] ?? 'News Reel',
              source: 'ASIAZE',
              timeAgo: _formatDate(r['publishedAt']),
            );
          }).toList();
          _loading = false;
        });
      }

      for (final v in _items) {
        final c = v.url.startsWith('refranceimages/') || v.url.startsWith('http')
            ? (v.url.startsWith('http') 
                ? VideoPlayerController.networkUrl(Uri.parse(v.url))
                : VideoPlayerController.asset(v.url))
            : VideoPlayerController.asset(v.url);
        c.setLooping(true);
        c.setVolume(_muted ? 0 : 1);
        _controllers.add(c);
      }
      
      Future.wait(_controllers.map((c) => c.initialize())).then((_) {
        if (!mounted) return;
        setState(() {});
        if (_controllers.isNotEmpty) {
          final first = _controllers.first;
          first.setVolume(_muted ? 0 : 1);
          first.play();
        }
      });
    } catch (e) {
      print('Error fetching reels: $e');
      setState(() {
        _items = [];
        _loading = false;
      });
    }
  }

  String _formatDate(dynamic date) {
    if (date == null) return 'Recently';
    try {
      final dt = DateTime.parse(date.toString());
      final diff = DateTime.now().difference(dt);
      if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
      if (diff.inHours < 24) return '${diff.inHours}h ago';
      return '${diff.inDays}d ago';
    } catch (e) {
      return 'Recently';
    }
  }

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    _pageController.dispose();
    super.dispose();
  }

  void _onPageChanged(int index) {
    for (int i = 0; i < _controllers.length; i++) {
      final c = _controllers[i];
      if (i == index) {
        c.setVolume(_muted ? 0 : 1);
        c.play();
      } else {
        c.pause();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      backgroundColor: Colors.black,
      body: _loading
          ? const Center(
              child: CircularProgressIndicator(color: Colors.white),
            )
          : _items.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.videocam_off, size: 64, color: Colors.grey.shade600),
                      const SizedBox(height: 16),
                      Text(
                        'No reels available',
                        style: TextStyle(color: Colors.grey.shade400, fontSize: 18),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Check back later for new content',
                        style: TextStyle(color: Colors.grey.shade600, fontSize: 14),
                      ),
                    ],
                  ),
                )
              : PageView.builder(
                  controller: _pageController,
                  scrollDirection: Axis.vertical,
                  itemCount: _items.length,
                  onPageChanged: _onPageChanged,
                  itemBuilder: (context, index) {
                    final item = _items[index];
                    final controller = _controllers[index];
                    return _VideoPage(
                      controller: controller,
                      item: item,
                      red: red,
                      muted: _muted,
                      onToggleMute: () {
                        setState(() {
                          _muted = !_muted;
                          controller.setVolume(_muted ? 0 : 1);
                        });
                      },
                    );
                  },
                ),
    );
  }
}

class _VideoPage extends StatefulWidget {
  final VideoPlayerController controller;
  final _VideoModel item;
  final Color red;
  final bool muted;
  final VoidCallback onToggleMute;
  const _VideoPage({required this.controller, required this.item, required this.red, required this.muted, required this.onToggleMute});

  @override
  State<_VideoPage> createState() => _VideoPageState();
}

class _VideoPageState extends State<_VideoPage> {
  bool _liked = false;
  int _likeCount = 12000;
  bool _saved = false;
  bool _descExpanded = false;

  String _fmt(Duration d) {
    final m = d.inMinutes.remainder(60).toString().padLeft(2, '0');
    final s = d.inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    final red = widget.red;
    final controller = widget.controller;
    final item = widget.item;

    return Stack(
      children: [
        Positioned.fill(
          child: AnimatedBuilder(
            animation: controller,
            builder: (context, _) {
              if (!controller.value.isInitialized) {
                return Container(color: Colors.black);
              }
              return FittedBox(
                fit: BoxFit.cover,
                child: SizedBox(
                  width: controller.value.size.width,
                  height: controller.value.size.height,
                  child: VideoPlayer(controller),
                ),
              );
            },
          ),
        ),
        Positioned.fill(
          child: IgnorePointer(
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black26,
                    Colors.transparent,
                    Colors.black54,
                    Colors.black87,
                  ],
                  stops: [0.0, 0.55, 0.85, 1.0],
                ),
              ),
            ),
          ),
        ),
        // Top header (brand centered, back left, mute right)
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: SizedBox(
              height: 36,
              child: Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child: const Text(
                      'asiaze',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.6,
                      ),
                    ),
                  ),
                  Positioned(
                    left: 0,
                    top: 0,
                    bottom: 0,
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () {
                        if (Navigator.of(context).canPop()) Navigator.of(context).pop();
                      },
                    ),
                  ),
                  Positioned(
                    right: 0,
                    top: 0,
                    bottom: 0,
                    child: IconButton(
                      icon: Icon(widget.muted ? Icons.volume_off : Icons.volume_up, color: Colors.white),
                      onPressed: widget.onToggleMute,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        // Right side actions (vertical rail)
        Positioned(
          right: 12,
          top: MediaQuery.of(context).size.height * 0.45,
          child: Column(
            children: [
              _CircleAction(
                icon: _liked ? Icons.favorite : Icons.favorite_border,
                label: '${_likeCount ~/ 1000}k',
                selected: _liked,
                labelBelow: true,
                onTap: () {
                  setState(() {
                    _liked = !_liked;
                    _likeCount += _liked ? 1 : -1;
                  });
                },
              ),
              const SizedBox(height: 16),
              _CircleAction(
                icon: _saved ? Icons.bookmark : Icons.bookmark_border,
                selected: _saved,
                onTap: () {
                  setState(() {
                    _saved = !_saved;
                  });
                },
              ),
              const SizedBox(height: 16),
              _CircleAction(
                icon: Icons.send,
                onTap: () async {
                  await Clipboard.setData(ClipboardData(text: item.url));
                  if (!mounted) return;
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Link copied to clipboard')),
                  );
                },
              ),
            ],
          ),
        ),
        // Bottom information and progress
        Positioned(
          left: 12,
          right: 12,
          bottom: 16,
          child: SafeArea(
            top: false,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Headline
                Text(
                  item.title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                // Source and time
                Text(
                  '${item.source} • ${item.timeAgo}',
                  style: const TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 8),
                // Summary expandable
                GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => setState(() => _descExpanded = !_descExpanded),
                  child: Text(
                    'This is a captivating summary that provides a brief overview of the video content, ensuring viewers are intrigued to watch more...',
                    maxLines: _descExpanded ? 10 : 3,
                    overflow: _descExpanded ? TextOverflow.visible : TextOverflow.ellipsis,
                    style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.4),
                  ),
                ),
                const SizedBox(height: 12),
                // Bottom row: time, swipe hint, tap to open
                AnimatedBuilder(
                  animation: controller,
                  builder: (context, _) {
                    final pos = controller.value.isInitialized ? controller.value.position : Duration.zero;
                    final dur = controller.value.isInitialized ? controller.value.duration : Duration.zero;
                    return Row(
                      children: [
                        Text('${_fmt(pos)} / ${_fmt(dur)}', style: const TextStyle(color: Colors.white, fontSize: 12)),
                        const Spacer(),
                        const Text('Swipe up  ^', style: TextStyle(color: Colors.white, fontSize: 12)),
                        const Spacer(),
                        const Text('Tap to open article', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      ],
                    );
                  },
                ),
                const SizedBox(height: 6),
                // Progress bar
                LayoutBuilder(
                  builder: (context, constraints) {
                    return AnimatedBuilder(
                      animation: controller,
                      builder: (context, _) {
                        final tot = controller.value.isInitialized ? controller.value.duration.inMilliseconds : 1;
                        final pos = controller.value.isInitialized ? controller.value.position.inMilliseconds : 0;
                        final double progress = constraints.maxWidth * (pos / (tot == 0 ? 1 : tot));
                        return Stack(
                          children: [
                            Container(height: 3, width: constraints.maxWidth, color: Colors.white24),
                            Container(height: 3, width: progress, color: red),
                          ],
                        );
                      },
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _CircleAction extends StatelessWidget {
  final IconData icon;
  final String? label;
  final bool selected;
  final VoidCallback? onTap;
  final bool labelBelow;
  const _CircleAction({required this.icon, this.label, this.selected = false, this.onTap, this.labelBelow = false});

  @override
  Widget build(BuildContext context) {
    final circle = Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        color: selected ? AsiazeApp.primaryRed.withOpacity(0.85) : Colors.black.withOpacity(0.5),
        shape: BoxShape.circle,
        border: Border.all(color: Colors.white24),
      ),
      child: Icon(icon, color: Colors.white),
    );

    if (labelBelow && label != null) {
      return GestureDetector(
        onTap: onTap,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(width: 48, height: 48, child: Center(child: circle)),
            const SizedBox(height: 6),
            Text(label!, style: const TextStyle(color: Colors.white, fontSize: 12)),
          ],
        ),
      );
    }

    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 48,
        height: 48,
        child: Stack(
          clipBehavior: Clip.none,
          alignment: Alignment.center,
          children: [
            circle,
            if (label != null)
              Positioned(
                right: -6,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.35),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white24),
                  ),
                  child: Text(label!, style: const TextStyle(color: Colors.white, fontSize: 12)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _TopCircleButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  const _TopCircleButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 36,
        height: 36,
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.45),
          shape: BoxShape.circle,
          border: Border.all(color: Colors.white30),
        ),
        child: Icon(icon, color: Colors.white),
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> _allCategories = [];
  List<Map<String, dynamic>> _userCategories = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchCategories();
  }

  Future<void> _fetchCategories() async {
    try {
      final categories = await ApiService.getCategories();
      setState(() {
        _allCategories = List<Map<String, dynamic>>.from(categories);
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    
    if (_loading) {
      return Scaffold(
        backgroundColor: Colors.white,
        body: const Center(child: CircularProgressIndicator()),
      );
    }

    final displayCategories = [
      {'name': 'My Feed', '_id': ''},
      {'name': 'Videos', '_id': 'videos'},
      ..._allCategories,
    ];
    
    return DefaultTabController(
      length: displayCategories.length,
      child: Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: Column(
            children: [
              const SizedBox(height: 12),
              Text(
                'asiaze',
                style: TextStyle(
                  color: red,
                  fontSize: 32,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 1.2,
                ),
              ),
              const SizedBox(height: 8),
              Material(
                color: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  child: TabBar(
                    isScrollable: true,
                    tabAlignment: TabAlignment.start,
                    dividerColor: Colors.transparent,
                    labelColor: red,
                    unselectedLabelColor: Colors.black87,
                    indicatorColor: red,
                    labelStyle: const TextStyle(fontWeight: FontWeight.w700),
                    unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500),
                    indicatorSize: TabBarIndicatorSize.label,
                    indicatorWeight: 3,
                    labelPadding: const EdgeInsets.only(right: 16),
                    tabs: displayCategories.map((cat) => Tab(text: cat['name'].toString())).toList(),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Container(
                  width: double.infinity,
                  height: 36,
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    color: red,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: const Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Breaking News: Major updates from around the world...',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14),
                      textAlign: TextAlign.left,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Expanded(
                child: TabBarView(
                  physics: const NeverScrollableScrollPhysics(),
                  children: displayCategories.map((cat) {
                    if (cat['name'] == 'Videos') {
                      return const VideosScreen();
                    }
                    return FeedList(
                      categoryName: cat['name'].toString(),
                      categoryId: cat['_id']?.toString(),
                    );
                  }).toList(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FeedList extends StatefulWidget {
  final String categoryName;
  final String? categoryId;
  const FeedList({super.key, required this.categoryName, this.categoryId});

  @override
  State<FeedList> createState() => _FeedListState();
}

class _FeedListState extends State<FeedList> {
  List<dynamic> _news = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchNews();
  }

  Future<void> _fetchNews() async {
    try {
      List<dynamic> news;
      if (widget.categoryName == 'My Feed') {
        final prefs = await SharedPreferences.getInstance();
        final categoryIds = prefs.getStringList('categoryIds') ?? [];
        if (categoryIds.isEmpty) {
          news = await ApiService.getNews();
        } else {
          news = [];
          for (final id in categoryIds) {
            final categoryNews = await ApiService.getNews(categoryId: id);
            news.addAll(categoryNews);
          }
        }
      } else {
        news = await ApiService.getNews(categoryId: widget.categoryId);
      }
      setState(() {
        _news = news;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_news.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.article_outlined, size: 64, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text('No news available', style: TextStyle(color: Colors.grey.shade600)),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: _news.length,
      itemBuilder: (context, index) {
        final article = _news[index];
        return Container(
          margin: const EdgeInsets.all(16.0),
          height: 400,
          child: NewsCard(
            imageUrl: article['image'] ?? 'asset:refranceimages/Group (16).png',
            title: article['title'] ?? 'No Title',
            subtitle: article['summary'] ?? article['content'] ?? '',
            meta: 'ASIAZE • ${_formatDate(article['publishedAt'])}',
          ),
        );
      },
    );
  }

  String _formatDate(dynamic date) {
    if (date == null) return 'Recently';
    try {
      final dt = DateTime.parse(date.toString());
      final diff = DateTime.now().difference(dt);
      if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
      if (diff.inHours < 24) return '${diff.inHours}h ago';
      return '${diff.inDays}d ago';
    } catch (e) {
      return 'Recently';
    }
  }
}

class _Post {
  final String image;
  final String title;
  final String subtitle;
  final String meta;
  _Post(this.image, this.title, this.subtitle, this.meta);
}

List<_Post> _samplePosts({bool shuffle = false}) {
  // A diverse set of posts using local assets for stable testing
  final seeds = <_Post>[
    _Post(
      'asset:refranceimages/Group (16).png',
      'Thrilling Soccer Match Concludes with Dramatic Finale',
      'A match that kept fans on the edge of their seats with a nail-biting finish and standout performances.',
      'ASIAZE • 2 hours ago',
    ),
    _Post(
      'asset:refranceimages/8033abcf5b97cb3ea004c5f5403f403561b33094.png',
      'Electric Cars Gain Momentum Across Major Cities',
      'EV adoption surges as infrastructure expands, incentives rise, and range anxiety fades for urban commuters.',
      'ASIAZE • 1 hour ago',
    ),
    // Extra sample posts for testing visibility
    _Post(
      'asset:refranceimages/4f52f4f362aa7270533b2fd93039fc712e5cc169.png',
      'Health Tips: Staying Active Daily',
      'Simple routines and mindful habits keep energy up and stress low throughout your week.',
      'ASIAZE • 5 hours ago',
    ),
    _Post(
      'asset:refranceimages/Home Feed Screen - ASIAZE News App.png',
      'My State: Top Headlines Now',
      'Quick snapshot of regional updates, alerts, and stories you can glance at fast.',
      'ASIAZE • 10 minutes ago',
    ),
    _Post(
      'asset:refranceimages/749bdeef4bdd026b9e097927f39b724af759225c.png',
      'Market Update: Tech Stocks Rally Strongly',
      'Investors respond to upbeat guidance and productivity boosts from AI-led transformations across industries.',
      'ASIAZE • 30 minutes ago',
    ),
    _Post(
      'asset:refranceimages/c049d488ea53162e319b73ae144cac43efe0c895.png',
      'New AI Breakthroughs Transform Daily Life',
      'From smarter assistants to creative tools, AI continues reshaping how we work, learn, and play.',
      'ASIAZE • 3 hours ago',
    ),
    _Post(
      'asset:refranceimages/d4ef3494bb5c951553079eccc43b57d68f698bb5.png',
      'Travel Diaries: Hidden Gems Around The World',
      'Explore breathtaking locales, vibrant cultures, and offbeat trails for your next adventures.',
      'ASIAZE • 4 hours ago',
    ),
    _Post(
      'asset:refranceimages/Group (16).png',
      'Startup Spotlight: Innovating Urban Mobility',
      'Lightweight EVs, shared fleets, and smarter routing unlock new convenience in crowded metros.',
      'ASIAZE • 5 hours ago',
    ),
    _Post(
      'asset:refranceimages/8033abcf5b97cb3ea004c5f5403f403561b33094.png',
      'Health & Wellness: Simple Habits That Stick',
      'Sleep, nutrition, and micro-movement routines to boost energy throughout your day.',
      'ASIAZE • 1 day ago',
    ),
    _Post(
      'asset:refranceimages/749bdeef4bdd026b9e097927f39b724af759225c.png',
      'Finance Essentials: Building Smarter Savings Plans',
      'Tips to automate, diversify, and protect your goals in changing markets.',
      'ASIAZE • 2 days ago',
    ),
    _Post(
      'asset:refranceimages/c049d488ea53162e319b73ae144cac43efe0c895.png',
      'Entertainment Buzz: Celebrity Interview Highlights',
      'Fresh insights, surprising reveals, and behind-the-scenes stories from recent interviews.',
      'ASIAZE • 2 hours ago',
    ),
    _Post(
      'asset:refranceimages/d4ef3494bb5c951553079eccc43b57d68f698bb5.png',
      'Eco Trends: Cities Embrace Greener Architecture',
      'Smart materials and energy-efficient designs reduce carbon footprints and improve livability.',
      'ASIAZE • 6 hours ago',
    ),
  ];
  // Build a longer list for scroll testing
  final list = List<_Post>.generate(40, (i) => seeds[i % seeds.length]);
  if (shuffle) list.shuffle();
  return list;
}

// Smooth Scroll Behavior: platform-aware physics with gentle easing and page snapping support.
class _SmoothScrollBehavior extends ScrollBehavior {
  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    final platform = Theme.of(context).platform;
    final base = (platform == TargetPlatform.iOS || platform == TargetPlatform.macOS)
        ? const BouncingScrollPhysics()
        : const ClampingScrollPhysics();
    // Use native platform physics for lists to ensure normal scrolling.
    return base;
  }
}

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String _lang = 'EN';
  bool _notif = true;

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: [
                const Icon(Icons.language),
                const SizedBox(width: 12),
                const Expanded(child: Text('Language')),
                _chip('EN'),
                const SizedBox(width: 8),
                _chip('HIN'),
                const SizedBox(width: 8),
                _chip('BEN'),
              ],
            ),
          ),
          const Divider(),
          InkWell(
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => const CategoryPreferencesScreen()),
              );
            },
            child: ListTile(
              leading: Icon(Icons.list, color: red),
              title: const Text('Category Preferences'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
          SwitchListTile(
            value: _notif,
            onChanged: (v) => setState(() => _notif = v),
            title: const Text('Notifications'),
            secondary: const Icon(Icons.notifications),
          ),
          ListTile(
            leading: const Icon(Icons.description),
            title: const Text('Privacy Policy'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Privacy Policy - Coming Soon')),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.description_outlined),
            title: const Text('Terms & Conditions'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Terms & Conditions - Coming Soon')),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.info_outline),
            title: const Text('About Us'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('About Us - Coming Soon')),
              );
            },
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: SizedBox(
              height: 48,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: red,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                onPressed: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.setBool('isLoggedIn', false);
                  await prefs.remove('userId');
                  await prefs.remove('userName');
                  await prefs.remove('userEmail');
                  if (!context.mounted) return;
                  Navigator.of(context).pushNamedAndRemoveUntil(LoginScreen.routeName, (route) => false);
                },
                child: const Text('Logout'),
              ),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),

    );
  }

  Widget _chip(String value) {
    final selected = _lang == value;
    return ChoiceChip(
      label: Text(value),
      selected: selected,
      onSelected: (_) => setState(() => _lang = value),
      selectedColor: AsiazeApp.primaryRed,
      labelStyle: TextStyle(color: selected ? Colors.white : null),
    );
  }
}

String _truncateWords(String text, int maxChars) {
  final cleaned = text.trim();
  if (cleaned.length <= maxChars) return cleaned;
  return '${cleaned.substring(0, maxChars).trim()}...';
}

// Saved Articles data and page
class SavedArticle {
  final String image;
  final String title;
  final String subtitle;
  final String meta;
  const SavedArticle({required this.image, required this.title, required this.subtitle, required this.meta});
}

class SavedArticlesStore {
  static final ValueNotifier<List<SavedArticle>> saved = ValueNotifier<List<SavedArticle>>([]);
  static bool isSavedTitle(String title) => saved.value.any((e) => e.title == title);
  static void toggle(SavedArticle a) {
    final list = List<SavedArticle>.from(saved.value);
    final idx = list.indexWhere((e) => e.title == a.title);
    if (idx >= 0) {
      list.removeAt(idx);
    } else {
      list.insert(0, a);
    }
    saved.value = list;
  }
}

class SavedArticlesScreen extends StatelessWidget {
  const SavedArticlesScreen({super.key});

  Widget _imageWidget(String image) {
    if (image.startsWith('asset:')) {
      return Image.asset(image.replaceFirst('asset:', ''), height: 160, width: double.infinity, fit: BoxFit.cover);
    } else if (image.startsWith('refranceimages/')) {
      return Image.asset(image, height: 160, width: double.infinity, fit: BoxFit.cover);
    } else {
      return Image.network(image, height: 160, width: double.infinity, fit: BoxFit.cover);
    }
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => Navigator.of(context).maybePop()),
        title: const Text('Saved Articles'),
        centerTitle: true,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0.5,
      ),
      body: ValueListenableBuilder<List<SavedArticle>>(
        valueListenable: SavedArticlesStore.saved,
        builder: (context, list, _) {
          if (list.isEmpty) {
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Image.asset(
                    'refranceimages/4f52f4f362aa7270533b2fd93039fc712e5cc169.png',
                    height: 80,
                    alignment: Alignment.centerLeft,
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'No saved articles yet',
                    style: TextStyle(color: Colors.black54),
                    textAlign: TextAlign.left,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Save articles by tapping the bookmark icon.',
                    style: TextStyle(color: Colors.black45),
                  ),
                ],
              ),
            );
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: list.length,
            itemBuilder: (context, i) {
              final a = list[i];
              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: Card(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  clipBehavior: Clip.antiAlias,
                  elevation: 1,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _imageWidget(a.image),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(a.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                            const SizedBox(height: 6),
                            Text(a.subtitle, style: TextStyle(color: Colors.grey.shade700)),
                            const SizedBox(height: 6),
                            Row(
                              children: [
                                Text(a.meta, style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                                const Spacer(),
                                IconButton(
                                  icon: const Icon(Icons.bookmark, color: Colors.black87),
                                  onPressed: () {
                                    SavedArticlesStore.toggle(a);
                                  },
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class NewsCard extends StatelessWidget {
  final String imageUrl;
  final String title;
  final String subtitle;
  final String meta;
  const NewsCard({
    super.key,
    required this.imageUrl,
    required this.title,
    required this.subtitle,
    required this.meta,
  });

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Card(
      elevation: 2,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              (imageUrl.startsWith('asset:')
                  ? Image.asset(
                      imageUrl.replaceFirst('asset:', ''),
                      height: 200,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    )
                  : Image.network(
                      imageUrl,
                      height: 200,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    )),
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: red,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: ValueListenableBuilder<List<SavedArticle>>(
                    valueListenable: SavedArticlesStore.saved,
                    builder: (context, saved, _) {
                      final isSaved = saved.any((e) => e.title == title);
                      return Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          GestureDetector(
                            onTap: () {
                              SavedArticlesStore.toggle(SavedArticle(
                                image: imageUrl,
                                title: title,
                                subtitle: subtitle,
                                meta: meta,
                              ));
                            },
                            child: Icon(isSaved ? Icons.bookmark : Icons.bookmark_border, color: Colors.white, size: 18),
                          ),
                          const SizedBox(width: 8),
                          GestureDetector(
                            onTap: () async {
                              await Clipboard.setData(ClipboardData(text: title));
                              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Link copied')));
                            },
                            child: const Icon(Icons.share, color: Colors.white, size: 18),
                          ),
                        ],
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.black),
                ),
                const SizedBox(height: 8),
                Text(
                  subtitle,
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 14, height: 1.4),
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 12),
                Text(
                  meta,
                  style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ---------------- Reward Screen ----------------
class RewardScreen extends StatelessWidget {
  const RewardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text('Reward Points'),
        centerTitle: true,
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0.5,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 24),
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: red,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.card_giftcard, color: Colors.white, size: 40),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    '520 Points',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      color: red,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Share news or refer friends to earn more\npoints.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.black87, fontSize: 14),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SizedBox(
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: red,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(25),
                    ),
                  ),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Invite feature coming soon!')),
                    );
                  },
                  child: const Text('Invite Friends', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                ),
              ),
            ),
            const SizedBox(height: 24),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Text(
                'Available Rewards',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.black87,
                ),
              ),
            ),
            const SizedBox(height: 12),
            _RewardCard(
              icon: '🎁',
              title: '₹100 Amazon Gift Card',
              points: '500 pts',
              red: red,
            ),
            _RewardCard(
              icon: '📱',
              title: '₹150 Google Play Voucher',
              points: '700 pts',
              red: red,
              isAvailable: false,
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                'Points are verified through your share/referral activity.',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RewardCard extends StatelessWidget {
  final String icon;
  final String title;
  final String points;
  final Color red;
  final bool isAvailable;

  const _RewardCard({
    required this.icon,
    required this.title,
    required this.points,
    required this.red,
    this.isAvailable = true,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: Text(icon, style: const TextStyle(fontSize: 24)),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  points,
                  style: TextStyle(
                    fontSize: 13,
                    color: Colors.grey.shade600,
                  ),
                ),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: isAvailable ? red : red.withOpacity(0.5),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
            ),
            onPressed: isAvailable
                ? () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Redeem feature coming soon!')),
                    );
                  }
                : null,
            child: const Text('Redeem', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }
}

// ---------------- Preferences (Language & Interests) ----------------
class PreferencesScreen extends StatefulWidget {
  const PreferencesScreen({super.key});
  static const String routeName = '/preferences';

  @override
  State<PreferencesScreen> createState() => _PreferencesScreenState();
}

class _PreferencesScreenState extends State<PreferencesScreen> {
  String _lang = 'EN';
  final List<String> _languages = const ['EN', 'HIN', 'BEN'];
  List<Map<String, dynamic>> _categories = [];
  final Set<String> _selected = {};
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _fetchCategories();
  }

  Future<void> _fetchCategories() async {
    try {
      final categories = await ApiService.getCategories();
      setState(() {
        _categories = List<Map<String, dynamic>>.from(categories);
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load categories: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final red = AsiazeApp.primaryRed;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 8),
              const Text(
                'Choose Your Language',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: _languages.map((l) => _langChip(l, red)).toList(),
              ),
              const SizedBox(height: 24),
              const Text(
                'Select Your Interests',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 16),
              _loading
                  ? const Center(child: CircularProgressIndicator())
                  : _categories.isEmpty
                      ? const Center(child: Text('No categories available'))
                      : GridView.count(
                          crossAxisCount: 2,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                          childAspectRatio: 1.9,
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          children: _categories.map((c) => _interestTile(c['name'].toString(), red)).toList(),
                        ),
              const SizedBox(height: 24),
              Align(
                alignment: Alignment.center,
                child: SizedBox(
                  width: 240,
                  height: 52,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: red,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(26),
                      ),
                    ),
                    onPressed: () async {
                      if (_selected.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Please select at least one interest')),
                        );
                        return;
                      }
                      
                      final prefs = await SharedPreferences.getInstance();
                      final userId = prefs.getString('userId');
                      
                      // Save category IDs for filtering
                      final selectedIds = _categories
                          .where((c) => _selected.contains(c['name'].toString()))
                          .map((c) => c['_id'].toString())
                          .toList();
                      
                      // Save to local storage
                      await prefs.setString('language', _lang);
                      await prefs.setStringList('interests', _selected.toList());
                      await prefs.setStringList('categoryIds', selectedIds);
                      
                      print('Saved preferences - Language: $_lang, Interests: ${_selected.toList()}, IDs: $selectedIds');
                      
                      // Save to backend if userId exists
                      if (userId != null && userId.isNotEmpty) {
                        try {
                          print('Updating backend with userId: $userId, language: $_lang, categoryIds: $selectedIds');
                          final result = await ApiService.updateUserPreferences(userId, _lang, selectedIds);
                          print('Backend preferences updated successfully: $result');
                          
                          if (!mounted) return;
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Preferences saved successfully!')),
                          );
                        } catch (e) {
                          print('Failed to update backend preferences: $e');
                          if (!mounted) return;
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Warning: Could not sync to server: $e')),
                          );
                        }
                      } else {
                        print('No userId found, skipping backend update');
                      }
                      
                      if (!mounted) return;
                      Navigator.of(context).pushReplacementNamed(MainNav.routeName);
                    },
                    child: const Text('Continue'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _langChip(String value, Color red) {
    final selected = _lang == value;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12.0),
      child: GestureDetector(
        onTap: () => setState(() => _lang = value),
        child: Container(
          width: 72,
          height: 72,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: selected ? red : Colors.white,
            border: Border.all(color: Colors.black87, width: selected ? 0 : 1.5),
          ),
          child: Center(
            child: Text(
              value,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: selected ? Colors.white : Colors.black,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _interestTile(String label, Color red) {
    final selected = _selected.contains(label);
    return GestureDetector(
      onTap: () {
        setState(() {
          if (selected) {
            _selected.remove(label);
          } else {
            _selected.add(label);
          }
        });
      },
      child: Container(
        decoration: BoxDecoration(
          color: selected ? red : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.black12),
        ),
        child: Stack(
          children: [
            Positioned(
              top: 10,
              left: 12,
              child: Icon(
                selected ? Icons.radio_button_checked : Icons.radio_button_unchecked,
                color: selected ? Colors.white : Colors.black54,
                size: 20,
              ),
            ),
            Center(
              child: Text(
                label,
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: selected ? Colors.white : Colors.black,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
