namespace App\Http\Controllers\Api;

use App\Models\Artikel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikels = Artikel::all();
        return response()->json($artikels);
    }
}
