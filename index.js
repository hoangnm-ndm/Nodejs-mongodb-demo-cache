import redis from "redis";

// Tạo client Redis
const client = redis.createClient({
	url: "redis://localhost:6379",
});

// Xử lý lỗi kết nối
client.on("error", (err) => console.log("Redis Client Error", err));

// Kết nối Redis
client.connect();

async function redisDemo() {
	// Lưu trữ string
	await client.set("name", "CodeFarm");
	console.log("Get name:", await client.get("name"));

	// Lưu trữ 1 token với TTL (10 giây)
	await client.setEx("token", 10, "12329328392");
	console.log("Get token:", await client.get("token"));

	// Lưu trữ hash
	await client.hSet("user:1", {
		name: "hoangnm",
		age: 33,
		email: "hoangnm.ndm@gmail.com",
	});
	console.log("Get user:1:", await client.hGetAll("user:1"));

	// Lưu trữ list

	// Xóa danh sách tasks nếu đã tồn tại
	await client.del("tasks");

	// Hoặc Xóa sau 10 giây
	await client.expire("tasks", 10);

	await client.lPush("tasks", ["task1", "task2", "task3"]);
	console.log("Get tasks:", await client.lRange("tasks", 0, -1));

	// Đóng kết nối
	await client.quit();
}

redisDemo();
