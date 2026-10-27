<?php

namespace App\Services\Odoo; // ← replace "Odoo" with the name of the integration

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

/**
 * Client for the Odoo integration.
 *
 * Every external integration gets its own class: it stays testable (Http::fake())
 * and is easy to swap out. Credentials come from config/services.php → .env, never from code.
 */
class OdooClient
{
    public function __construct(
        private readonly string $baseUrl = '',
        private readonly string $apiKey = '',
    ) {}

    public static function fromConfig(): self
    {
        return new self(
            baseUrl: (string) config('services.odoo.url'),
            apiKey: (string) config('services.odoo.key'),
        );
    }

    protected function http(): PendingRequest
    {
        return Http::baseUrl($this->baseUrl)
            ->withToken($this->apiKey)
            ->acceptJson()
            ->timeout(15)
            ->retry(2, 500);
    }

    // TODO: add methods per use case, e.g.:
    // public function createLead(array $data): array { return $this->http()->post('/leads', $data)->throw()->json(); }
}

/*
 * config/services.php:
 *   'odoo' => ['url' => env('ODOO_URL'), 'key' => env('ODOO_KEY')],
 *
 * .env.example and .env (empty, never real keys in Git):
 *   ODOO_URL=
 *   ODOO_KEY=
 */
