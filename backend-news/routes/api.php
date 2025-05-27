use App\Http\Controllers\Api\ArtikelController;

Route::middleware('api')->get('/artikels', [ArtikelController::class, 'index']);
