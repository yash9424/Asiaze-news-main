import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'http://localhost:3000/api';

  // Login
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception(jsonDecode(response.body)['error'] ?? 'Login failed');
    }
  }

  // Sign Up
  static Future<Map<String, dynamic>> signUp(String name, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name, 'email': email, 'password': password, 'role': 'user'}),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception(jsonDecode(response.body)['error'] ?? 'Sign up failed');
    }
  }

  // Get all news
  static Future<List<dynamic>> getNews({String? categoryId}) async {
    String url = '$baseUrl/news';
    if (categoryId != null && categoryId.isNotEmpty) {
      url += '?category=$categoryId';
    }
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['news'] ?? [];
    } else {
      throw Exception('Failed to load news');
    }
  }

  // Get all reels
  static Future<List<dynamic>> getReels({String? categoryId}) async {
    String url = '$baseUrl/reels';
    if (categoryId != null && categoryId.isNotEmpty) {
      url += '?category=$categoryId';
    }
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['reels'] ?? [];
    } else {
      throw Exception('Failed to load reels');
    }
  }

  // Get all categories
  static Future<List<dynamic>> getCategories() async {
    final response = await http.get(Uri.parse('$baseUrl/categories'));

    if (response.statusCode == 200) {
      return jsonDecode(response.body)['categories'] ?? [];
    } else {
      throw Exception('Failed to load categories');
    }
  }
}
