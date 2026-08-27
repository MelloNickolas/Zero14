using Zero14.Repository.Context;

namespace Zero14.Repository;

public abstract class BaseRepository
{
  protected readonly Zero14DbContext _context;

  protected BaseRepository(Zero14DbContext context)
  {
    _context = context;
  }
}
